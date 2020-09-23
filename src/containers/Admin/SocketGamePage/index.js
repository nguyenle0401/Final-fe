import React, { useState, useEffect, componentWillUnmount } from "react";
import "./style.scss";
import socket from "./socket";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const numberOfQuestions = 5;

function SocketGamePage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(0);
  const [questIndex, setQuestIndex] = useState(0);
  const [opponent, setOpponent] = useState(null);
  let name = useSelector((s) => s.auth.user);
  useEffect(() => {
    socket.emit("online", name._id);
    return () => {
      socket.emit("offline", name._id);
    };
  }, []);

  useEffect(() => {
    socket.on("opponent", (data) => {
      console.log("opponent", data);
      setOpponent(data);
    });

    socket.on("questions", (data) => {
      console.log("questions", data);
      setQuestions(data);
    });
  }, []);

  const WaitingPanel = () => {
    return (
      <div className="pin-panel">
        <p>WAITING FOR YOUR OPPONENT</p>
      </div>
    );
  };

  const OpponentDetail = (props) => {
    console.log("op detail", props.op[0].name);
    return (
      <div className="opponent-detail">
        <p>
          This is your opponent {props.op[0].name} {props.op[0]._id}
        </p>
      </div>
    );
  };

  const Quest = (props) => {
    console.log("quest", props);
    console.log("questions", questions);
    return (
      <div>
        {!props.quest ? null : (
          <div>
            <h1>{props.quest.title}?</h1>
            <p>{props.quest.answer}</p>
            <p>{props.quest.answer1}</p>
            <p>{props.quest.answer2}</p>
            <p>{props.quest.answer3}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {opponent ? (
        <OpponentDetail op={opponent}></OpponentDetail>
      ) : (
        <WaitingPanel></WaitingPanel>
      )}
      <Quest quest={questions[questIndex]}></Quest>
    </div>
  );
}

export default SocketGamePage;
