import React, { useState, useEffect, componentWillUnmount } from "react";
import "./style.scss";
import socket from "./socket";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const numberOfQuestions = 5;

function SocketGamePage() {
  const [questions, setQuestions] = useState([]);
  const [questIndex, setQuestIndex] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const [score, setScore] = useState(0);
  const [opScore, setOpScore] = useState(0);
  const [disabledClick, setDisabledClick] = useState(false);
  const [showResult, setShowResult] = useState(false);
  let name = useSelector((s) => s.auth.user);
  useEffect(() => {
    socket.emit("online", name._id);
    return () => {
      socket.emit("offline", name._id);
    };
  }, []);

  useEffect(() => {
    socket.emit("updateScore", name._id, score);
  }, [score]);

  // useEffect(() => {
  //   if (questIndex < numberOfQuestions) {
  //     console.log("clickState", questIndex, numberOfQuestions);
  //     socket.emit("clickState", name._id);
  //   }
  // }, [clickState]);

  socket.on("next", () => {
    console.log("next");
    if (questIndex < numberOfQuestions - 1) {
      console.log("questIndex", questIndex);
      setQuestIndex(questIndex + 1);
      console.log("questIndex", questIndex);
      setDisabledClick(false);
    } else {
      setShowResult(true);
    }
  });

  socket.on("opponent", (data) => {
    if (!data) {
      setDisabledClick(false);
      setQuestIndex(0);
      setScore(0);
      setOpScore(0);
      setShowResult(false);
      setQuestions([]);
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

  const handleClick = function (result) {
    setDisabledClick(true);
    if (result) setScore(score + 1);
    if (questIndex < numberOfQuestions - 1) {
      socket.emit("clickState", name._id);
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

            <button
              className="style-answer"
              onClick={() => handleClick(true)}
              disabled={props.disabled}
            >
              {props.quest.answer}
            </button>
            <button
              className="style-answer"
              onClick={() => handleClick(false)}
              disabled={props.disabled}
            >
              {props.quest.answer1}
            </button>
            <button
              className="style-answer"
              onClick={() => handleClick(false)}
              disabled={props.disabled}
            >
              {props.quest.answer2}
            </button>
            <button
              className="style-answer"
              onClick={() => handleClick(false)}
              disabled={props.disabled}
            >
              {props.quest.answer3}
            </button>
          </div>
        )}
      </div>
    );
  };

  const Result = (props) => {
    return (
      <div>
        {props.score > props.opScore ? (
          <h1>WIN</h1>
        ) : props.score === props.opScore ? (
          <h1>TIE</h1>
        ) : (
          <h1>LOSE</h1>
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
          <Quest quest={questions[questIndex]} disabled={disabledClick}></Quest>
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
