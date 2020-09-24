import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../redux/actions";
import { Redirect } from "react-router-dom";

function rand(items) {
  return items[~~(items.length * Math.random())];
}

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gameObj = useSelector((s) => s.game);

  const [currentNum, setCurrentNum] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    dispatch(gameActions.fetchGame());
  }, [dispatch]);

  const handleNavigation = (step) => {
    setClicked(false);
    setCurrentNum(currentNum + step);
  };
  const calcTotalScore = (tempScore) => {
    setTotalScore(tempScore + totalScore);
  };
  if (gameObj.questions.length <= 0) {
    return <h1>No game yet</h1>;
  }

  return (
    <div style={{ width: "100%" }}>
      <GameInfo
        user={user}
        qty={gameObj.qty}
        totalScore={totalScore}
        currentNum={currentNum}
      />
      <div style={{ width: "100%" }}>
        <div className="game_card">
          <GameCard
            question={gameObj.questions[currentNum]}
            qty={gameObj.qty}
            setCurrentNum={setCurrentNum}
            currentNum={currentNum}
            calcTotalScore={calcTotalScore}
            clicked={clicked}
            setClicked={setClicked}
          />
          <div>
            <GameNaviation
              handleNavigation={handleNavigation}
              qty={gameObj.qty}
              currentNum={currentNum}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GameInfo = ({ totalScore, user, qty, currentNum }) => {
  return (
    <div>
      <h4>
        {/* eslint-disable jsx-a11y/accessible-emoji */}
        <span role="img">🧑🏼‍💻</span>: <strong>{user.name}</strong>
      </h4>
      <h4>
        Question:{" "}
        <strong>
          {currentNum + 1}/{qty}
        </strong>
      </h4>
      {/* <button className="replay">
        <span className="material-icons">replay</span>{" "}
      </button> */}
    </div>
  );
};

const GameNaviation = ({
  handleNavigation,
  qty,
  currentNum,
  setCurrentNum,
}) => {
  return (
    <div>
      <h1>
        <button
          className="button"
          disabled={currentNum <= 0}
          onClick={() => handleNavigation(-1)}
        >
          {/* eslint-disable jsx-a11y/accessible-emoji */}
          <span role="img">⏪</span>
        </button>{" "}
        &nbsp;
        <button
          className="button"
          disabled={currentNum >= qty - 1}
          onClick={() => handleNavigation(1)}
        >
          {" "}
          {/* eslint-disable jsx-a11y/accessible-emoji */}
          <span role="img">⏩</span>
        </button>
      </h1>
    </div>
  );
};
let time = 300;
let score = 0;

const handleAnswer = (
  v,
  answer,
  currentNum,
  setCurrentNum,
  setClicked,
  clicked,
  nQuestions
) => {
  // if (clicked) {
  //   return;
  // }
  let result;
  if (v === answer) {
    result = { status: "win", rate: 1 };
  } else {
    result = { status: "lose", rate: 0 };
  }

  score = score + result.rate * time;
  setClicked(true);

  setTimeout(() => {
    if (currentNum >= nQuestions - 1) return;
    setCurrentNum(currentNum + 1);
    setClicked(false);
  }, 5000);
};

const Answer = ({
  v,
  answer,
  currentNum,
  setCurrentNum,
  correct,
  setClicked,
  clicked,
  nQuestions,
}) => {
  console.log(`correct of ${v} is ${correct} and ${clicked}`);
  return (
    <div>
      <button
        className={
          correct && clicked
            ? "style-answer correct-answer"
            : clicked
            ? "style-answer wrong-answer"
            : "style-answer"
        }
        onClick={() =>
          handleAnswer(
            v,
            answer,
            currentNum,
            setCurrentNum,
            setClicked,
            clicked,
            nQuestions
          )
        }
      >
        {v}
      </button>
    </div>
  );
};
const GameCard = ({
  question,
  currentNum,
  setCurrentNum,
  clicked,
  setClicked,
}) => {
  // const [time, setTime] = useState(0);

  const renderAnswers = (
    question,
    answer,
    currentNum,
    setCurrentNum,
    clicked,
    setClicked
  ) => {
    console.log("render answers ", clicked);
    let arr = [null, null, null, null];
    let choices = [0, 1, 2, 3];
    for (let i in question) {
      if (i.startsWith("answer")) {
        let foo = rand(choices);
        choices = choices.filter((e) => e !== foo);
        console.log("okay", question[i] === answer);
        arr[foo] = (
          <Answer
            v={question[i]}
            key={i}
            correct={question[i] === answer}
            clicked={clicked}
            answer={answer}
            currentNum={currentNum}
            setCurrentNum={setCurrentNum}
            setClicked={setClicked}
            nQuestions={question.length}
          />
        );
      }
    }
    return <>{arr}</>;
  };

  if (!question) return <Redirect to="/admin/game" />;

  return (
    <div className="game_card_container">
      <button className="style-question">
        "{question.title}", what does it mean?
      </button>
      {renderAnswers(
        question,
        question.answer,
        currentNum,
        setCurrentNum,
        clicked,
        setClicked
      )}
    </div>
  );
};

export default GamePage;
