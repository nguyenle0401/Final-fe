import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { gameActions } from "../../../redux/actions";
import "./style.css";
function rand(items) {
  // "~~" for a closest "int"
  return items[~~(items.length * Math.random())];
}

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const gameObj = useSelector((s) => s.game);

  const [currentNum, setCurrentNum] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  console.log(gameObj);
  useEffect(() => {
    dispatch(gameActions.fetchGame());
  }, []);

  const handleNavigation = (step) => {
    setCurrentNum(currentNum + step);
  };
  const calcTotalScore = (tempScore) => {
    setTotalScore(tempScore + totalScore);
  };
  if (gameObj.questions.length <= 0) {
    return <h1>No game yet</h1>;
  }

  return (
    <div className="bg-quiz">
      <GameInfo
        user={user}
        qty={gameObj.qty}
        totalScore={totalScore}
        currentNum={currentNum}
      />
      <GameCard
        question={gameObj.questions[currentNum]}
        qty={gameObj.qty}
        setCurrentNum={setCurrentNum}
        currentNum={currentNum}
        calcTotalScore={calcTotalScore}
      />
      <GameNaviation
        handleNavigation={handleNavigation}
        qty={gameObj.qty}
        currentNum={currentNum}
      />
    </div>
  );
};

const GameInfo = ({ totalScore, user, qty, currentNum }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>Score: {totalScore}</h1>
      <h2>
        Question#: {currentNum + 1}/{qty}
      </h2>
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
const handleAnswer = (v, answer, currentNum, setCurrentNum) => {
  let result;
  if (v == answer) {
    result = { status: "win", rate: 1 };
  } else {
    result = { status: "lose", rate: 0 };
  }
  console.log(result.status);
  console.log("pre", score);
  score = score + result.rate * time;
  console.log("score", score);
  setCurrentNum(currentNum + 1);
  console.log("this round", currentNum + 1);
};

const Answer = ({ v, answer, currentNum, setCurrentNum }) => {
  return (
    <div>
      <button
        className="style-answer"
        onClick={() => handleAnswer(v, answer, currentNum, setCurrentNum)}
      >
        {v}
      </button>
    </div>
  );
};
const GameCard = ({ question, currentNum, setCurrentNum }) => {
  const [time, setTime] = useState(0);
  // useEffect(() => {}, []);

  const renderAnswers = (question, answer, currentNum, setCurrentNum) => {
    let arr = [null, null, null, null];
    let choices = [0, 1, 2, 3];
    for (let i in question) {
      if (i.startsWith("answer")) {
        let foo = rand(choices);
        choices = choices.filter((e) => e !== foo);
        arr[foo] = (
          <Answer
            v={question[i]}
            answer={answer}
            currentNum={currentNum}
            setCurrentNum={setCurrentNum}
          />
        );
        console.log("asdsa", question[i]);
      }
    }
    console.log(arr);
    return <>{arr}</>;
  };

  return (
    <div>
      <button className="style-question">
        "{question.title}", what's dose it mean?
      </button>
      {renderAnswers(question, question.answer, currentNum, setCurrentNum)}
    </div>
  );
};

export default GamePage;
