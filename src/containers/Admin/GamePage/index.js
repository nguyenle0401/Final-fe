import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { gameActions } from "../../../redux/actions";
import { Redirect } from "react-router-dom";

function rand(items) {
  // "~~" for a closest "int"
  return items[~~(items.length * Math.random())];
}

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gameObj = useSelector((s) => s.game);

  const [currentNum, setCurrentNum] = useState(0);
  const [cliked, setCliked] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    dispatch(gameActions.fetchGame());
  }, []);

  const handleNavigation = (step) => {
    setCliked(false);
    setCurrentNum(currentNum + step);
  };
  const calcTotalScore = (tempScore) => {
    setTotalScore(tempScore + totalScore);
  };
  if (gameObj.questions.length <= 0) {
    return <h1>No game yet</h1>;
  }

  return (
    <div className="bg-qui" style={{ width: "100%" }}>
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
            cliked={cliked}
            setCliked={setCliked}
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
        🧑🏼‍💻: <strong>{user.name}</strong>
      </h4>
      <h4>
        Score:<strong>{totalScore}</strong>
      </h4>
      <h4>
        Question:{" "}
        <strong>
          {currentNum + 1}/{qty}
        </strong>
      </h4>
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
          ⏪
        </button>{" "}
        &nbsp;
        <button
          className="button"
          disabled={currentNum >= qty - 1}
          onClick={() => handleNavigation(1)}
        >
          {" "}
          ⏩
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
  setCliked,
  cliked,
  nQuestions
) => {
  if (cliked) {
    return;
  }
  let result;
  if (v == answer) {
    result = { status: "win", rate: 1 };
  } else {
    result = { status: "lose", rate: 0 };
  }
  score = score + result.rate * time;
  setCliked(true);
  setTimeout(() => {
    if (currentNum >= nQuestions - 1) return;
    setCurrentNum(currentNum + 1);
    setCliked(false);
  }, 5000);
};

const Answer = ({
  v,
  answer,
  currentNum,
  setCurrentNum,
  correct,
  setCliked,
  cliked,
  nQuestions,
}) => {
  return (
    <div>
      <button
        className={`style-answer ${
          correct ? "correct-answer" : "wrong-answer"
        }`}
        onClick={() =>
          handleAnswer(
            v,
            answer,
            currentNum,
            setCurrentNum,
            setCliked,
            cliked,
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
  cliked,
  setCliked,
}) => {
  const [time, setTime] = useState(0);

  const renderAnswers = (
    question,
    answer,
    currentNum,
    setCurrentNum,
    cliked,
    setCliked
  ) => {
    console.log("render answers ", cliked);
    let arr = [null, null, null, null];
    let choices = [0, 1, 2, 3];
    for (let i in question) {
      if (i.startsWith("answer")) {
        let foo = rand(choices);
        choices = choices.filter((e) => e !== foo);
        arr[foo] = (
          <Answer
            v={question[i]}
            correct={question[i] == answer && cliked}
            cliked={cliked}
            answer={answer}
            currentNum={currentNum}
            setCurrentNum={setCurrentNum}
            setCliked={setCliked}
            nQuestions={question.length}
          />
        );
      }
    }
    return <>{arr}</>;
  };

  if (!question) return <Redirect to="/" />;

  return (
    <div className="game_card_container">
      <button className="style-question">
        "{question.title}", what dose it mean?
      </button>
      {renderAnswers(
        question,
        question.answer,
        currentNum,
        setCurrentNum,
        cliked,
        setCliked
      )}
    </div>
  );
};

export default GamePage;
