import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../redux/actions";
import { Redirect } from "react-router-dom";

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gameObj = useSelector((s) => s.game);
  const [currentNum, setCurrentNum] = useState(0);
  const [clicked, setClicked] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    dispatch(gameActions.fetchGame());
  }, [dispatch]);

  useEffect(() => {
    setClicked(null);
  }, [currentNum]);

  const handleNavigation = (step) => {
    if (currentNum >= gameObj.questions.length - 1) {
      return;
    }
    setCurrentNum(currentNum + step);
  };

  const calcTotalScore = (tempScore) => {
    setTotalScore(tempScore + totalScore);
  };
  if (gameObj.questions.length <= 0) {
    return <h1>No game yet</h1>;
  }

  // setTimeout(() => {
  //   handleNavigation(1);
  // }, 5000);

  return (
    <div style={{ width: "100%" }} className="game-body-1">
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
      <button className="replay">
        <span className="material-icons">replay</span>{" "}
      </button>
    </div>
  );
};

const GameNaviation = ({ handleNavigation, qty, currentNum }) => {
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
  let result;
  if (clicked) return;
  if (v === answer) {
    result = { status: "win", rate: 1 };
  } else {
    result = { status: "lose", rate: 0 };
  }

  score = score + result.rate * time;
  setClicked(v);
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
  const clickedThisAnswer = clicked === v;
  return (
    <div>
      <button
        className={
          correct && clicked
            ? "style-answer correct-answer"
            : clickedThisAnswer
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
    return question.answers.map((ans, i) => (
      <Answer
        v={ans}
        key={i}
        correct={ans === answer}
        clicked={clicked}
        answer={answer}
        currentNum={currentNum}
        setCurrentNum={setCurrentNum}
        setClicked={setClicked}
        nQuestions={question.length}
      />
    ));
  };

  if (!question) return <Redirect to="/admin/game" />;

  return (
    <div>
      <p className="style-question">"{question.title}", what does it mean?</p>
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
