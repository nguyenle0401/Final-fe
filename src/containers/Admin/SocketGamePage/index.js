import React, { useState, useEffect } from "react";
import "./style.scss";
import socket from "./socket";
import { useSelector } from "react-redux";

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

  // useEffect(() => {
  //   if (questIndex < numberOfQuestions) {
  //     console.log("clickState", questIndex, numberOfQuestions);
  //     socket.emit("clickState", name._id);
  //   }
  // }, [clickState]);

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
    setTimeout(callback, 5000);
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
          This is your opponent {props.op[0].name} {props.op[0]._id}
        </p>
      </div>
    );
  };

  const ScoreDetail = (props) => {
    return (
      <div className="score-detail">
        <p>Your Score: {props.score}</p>
        <p>Your opponent's score: {props.opScore}</p>
        <p>Question Number: {props.questIndex + 1}</p>
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
            <button className="style-question">
              "{props.quest.title}?", what does it mean?
            </button>
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

  return (
    <div>
      {opponent ? (
        <div>
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
            <Result score={score} opScore={opScore}></Result>
          ) : null}
        </div>
      ) : (
        <WaitingPanel></WaitingPanel>
      )}
    </div>
  );
}

export default SocketGamePage;
