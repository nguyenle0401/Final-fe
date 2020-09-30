import React, { useState, useEffect } from "react";
import "./style.scss";
import socket from "./socket";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";

const numberOfQuestions = 5;

const lists = [
  [1, 2, 3, 0],
  [1, 2, 0, 3],
  [1, 3, 2, 0],
  [1, 3, 0, 2],
  [1, 0, 2, 3],
  [1, 0, 3, 2],
  [2, 1, 3, 0],
  [2, 1, 0, 3],
  [2, 3, 1, 0],
  [2, 3, 0, 1],
  [2, 0, 1, 3],
  [2, 0, 3, 1],
  [3, 1, 2, 0],
  [3, 1, 0, 2],
  [3, 2, 1, 0],
  [3, 2, 0, 1],
  [3, 0, 1, 2],
  [3, 0, 2, 1],
  [0, 1, 2, 3],
  [0, 1, 3, 2],
  [0, 2, 1, 3],
  [0, 2, 3, 1],
  [0, 3, 1, 2],
  [0, 3, 2, 1],
];

let listIndex = Math.floor(Math.random() * lists.length);

function SocketGamePage() {
  const [questions, setQuestions] = useState([]);
  const [questIndex, setQuestIndex] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const [score, setScore] = useState(0);
  const [opScore, setOpScore] = useState(0);
  const [disabledClick, setDisabledClick] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [playingUsers, setPlayingUsers] = useState([]);
  const [state0, setState0] = useState({ active: false });
  const [state1, setState1] = useState({ active: false });
  const [state2, setState2] = useState({ active: false });
  const [state3, setState3] = useState({ active: false });
  let name = useSelector((s) => s.auth.user);

  useEffect(() => {
    socket.emit("online", name._id);
    return () => {
      socket.emit("offline", name._id);
    };
  }, [name._id]);

  useEffect(() => {
    socket.emit("updateScore", name._id, score);
  }, [score, name._id]);

  useEffect(() => {
    listIndex = Math.floor(Math.random() * lists.length);
    setState0({ active: false });
    setState1({ active: false });
    setState2({ active: false });
    setState3({ active: false });
  }, [questIndex]);

  socket.on("next", () => {
    console.log("next");
    const callback = () => {
      if (questIndex < numberOfQuestions - 1) {
        setQuestIndex(questIndex + 1);
        setDisabledClick(false);
        setShowResult(false);
      } else {
        console.log("okay");
        setDisabledClick(true);
        setShowResult(true);
      }
    };
    setTimeout(callback, 3000);
  });

  socket.on("opponent", (data) => {
    if (!data) {
      setDisabledClick(false);
      setQuestIndex(0);
      setScore(0);
      setOpScore(0);
      setShowResult(false);
      setQuestions([]);
      setState0({ active: false });
      setState1({ active: false });
      setState2({ active: false });
      setState3({ active: false });
    }
    setOpponent(data);
  });

  socket.on("questions", (data) => {
    setQuestions(data);
  });

  socket.on("opScore", (data) => {
    setOpScore(data);
  });

  socket.on("onlineUsers", (data) => {
    setOnlineUsers(data);
  });

  socket.on("playingUsers", (data) => {
    setPlayingUsers(data);
  });

  const replayClicked = () => {
    socket.emit("replay", name._id);
    setDisabledClick(false);
    setQuestIndex(0);
    setScore(0);
    setOpScore(0);
    setShowResult(false);
    setQuestions([]);
    setOpponent(null);
    setState0({ active: false });
    setState1({ active: false });
    setState2({ active: false });
    setState3({ active: false });
    // socket.emit("online", name._id);
  };

  const WaitingPanel = () => {
    return (
      <div className="pin-panel">
        <p>WAITING FOR YOUR OPPONENT</p>
      </div>
    );
  };

  const OpponentDetail = (props) => {
    return (
      <div className="opponent-detail">
        <p>
          <strong>Your opponent:</strong>
          <strong style={{ color: "red" }}> {props.op[0].name} </strong>
        </p>
        <p>
          <strong>ID:</strong> {props.op[0]._id}
        </p>
      </div>
    );
  };

  const ScoreDetail = (props) => {
    return (
      <div className=" color-text">
        <br />
        <p>
          <strong>Your Score:</strong> {props.score}
        </p>
        <p>
          <strong>Your opponent's score: </strong>
          {props.opScore}
        </p>
        <p>
          <strong>Question Number:</strong> {props.questIndex + 1}
        </p>
      </div>
    );
  };

  const handleClick = function (result, ansNum) {
    let currentState0;
    let currentState1;
    let currentState2;
    let currentState3;
    switch (ansNum) {
      case 0:
        currentState0 = state0.active;
        setState0({ active: !currentState0 });
        break;
      case 1:
        currentState1 = state1.active;
        setState1({ active: !currentState1 });
        break;
      case 2:
        currentState2 = state2.active;
        setState2({ active: !currentState2 });
        break;
      case 3:
        currentState3 = state3.active;
        setState3({ active: !currentState3 });
        break;
      default:
        break;
    }
    setDisabledClick(true);

    if (result) setScore(score + 1);
    if (questIndex < numberOfQuestions) {
      socket.emit("clickState", name._id);
    }
  };
  const getState = (ansNum) => {
    switch (ansNum) {
      case 0:
        return state0.active;
      case 1:
        return state1.active;
      case 2:
        return state2.active;
      case 3:
        return state3.active;
      default:
        break;
    }
  };

  const Quest = (props) => {
    return (
      <div className="game_card_container">
        {!props.quest ? null : (
          <div className="d-flex justify-content-center flex-column">
            <p className="style-question">
              "{props.quest.title}?", what does it mean?
            </p>
            {lists[listIndex].map((ansNum) => {
              return (
                <button
                  className={
                    getState(ansNum)
                      ? "style-answer clicked answer" + ansNum
                      : "style-answer answer" + ansNum
                  }
                  onClick={() => handleClick(!ansNum, ansNum)}
                  disabled={props.disabled}
                >
                  {props.quest["answer" + ansNum]}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const Result = (props) => {
    return (
      <div>
        {props.score > props.opScore ? (
          <h1>YOU WIN</h1>
        ) : props.score === props.opScore ? (
          <h1>TIE</h1>
        ) : (
          <h1>YOU LOSE</h1>
        )}
      </div>
    );
  };

  const Users = (props) => {
    return (
      <div className="color-text d-flex justify-content-between d-flex-row mf-5">
        <Table className="user-online" boder="2">
          <tr>
            <td style={{ backgroundColor: "rgb(121, 226, 240)" }}>
              <strong>Online Users</strong>
            </td>
          </tr>
          {props.onlineUsers.map((user) => {
            return (
              <tr>
                <td>
                  <div>{user.name}</div>
                </td>
              </tr>
            );
          })}
        </Table>
        <Table className="playing" boder="2">
          <tr>
            <td style={{ backgroundColor: "rgb(121, 226, 240)" }}>
              <strong>Playing Users</strong>
            </td>
          </tr>
          {props.playingUsers.map((user) => {
            return (
              <tr>
                <td>
                  <div>{user.name}</div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
      className="loading d-flex flex-column"
    >
      {opponent ? (
        <div style={{ width: "100%" }} className="position">
          <OpponentDetail op={opponent}></OpponentDetail>
          <ScoreDetail
            score={score}
            opScore={opScore}
            questIndex={questIndex}
          ></ScoreDetail>
          {questions ? (
            <Quest
              quest={questions[questIndex]}
              disabled={disabledClick}
            ></Quest>
          ) : null}
          {showResult ? (
            <div>
              <Result score={score} opScore={opScore}></Result>
              <button className="replay" onClick={() => replayClicked()}>
                <span className="material-icons">replay</span>{" "}
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "500px" }}
          >
            <WaitingPanel></WaitingPanel>

            <HashLoader color="green" size={100} loading={true} />
          </div>
          <div className="list">
            <Users
              playingUsers={playingUsers}
              onlineUsers={onlineUsers}
            ></Users>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocketGamePage;
