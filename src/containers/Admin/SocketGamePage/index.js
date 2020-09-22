import React, { useState, useEffect } from "react";
import "./style.css";
import socket from "./socket";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function SocketGamePage() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [user, setUser] = useState(null);
  const messagesRef = React.useRef(messages);
  let name = useSelector((s) => s.auth.user);

  useEffect(() => {
    socket.on("connection");

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    askForName();
  }, []);

  useEffect(() => {
    socket.on("rooms", function (data) {
      // data= rooms from backend
      console.log("rooms ahihi", data);
      setRooms(data);
    });
  }, [rooms]);

  React.useEffect(() => {
    socket.on("users", function (data) {
      console.log("data", data);
      if (data && Array.isArray(data)) {
        setUsers(data);
      }
    });
  }, [users]);

  React.useEffect(() => {
    socket.on("message", function (chat) {
      messagesRef.current = [chat, ...messagesRef.current];
      setMessages(messagesRef.current);
    });
  }, []);

  const askForName = () => {
    // let pin = prompt("Input PIN");
    if (true) {
      socket.emit("login", name, (res) => {
        console.log("response from backend", res);
        setUser(res);
      });
    } else {
      askForName();
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const message = e.target.chat.value;
    socket.emit("sendMessage", message);
    const form = document.getElementById("chatform");
    form.reset();
  };

  const Rooms = (props) =>
    props.rooms.map((e, idx) => {
      return (
        <div className="room tweetbtn">
          <div className="row my-3">
            <div id="outerMenuContainer">
              <div className="chat-room">
                <p
                  className={
                    !props.currentRoom
                      ? ""
                      : e._id === props.currentRoom._id
                      ? "bold"
                      : ""
                  }
                  onClick={() => {
                    if (props.currentRoom) {
                      socket.emit("leaveRoom", props.currentRoom._id);
                    }
                    socket.emit("joinRoom", e._id, (res) => {
                      if (res.status === "ok") {
                        props.setCurrentRoom(res.data.room);
                      } else {
                        alert("something wrong");
                      }
                    });
                  }}
                >
                  {" "}
                  {e.room + " " + e.members.length}{" "}
                  {idx === props.rooms.length - 1 ? "" : ""}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const showMessage = (chat) => {
    if (!chat) {
      return chat;
    }
  };

  const Message = ({ obj, user }) => {
    return (
      <p>
        <span
          className={obj.user._id === user._id ? "red" : "black"}
          style={{ fontWeight: "bold" }}
        >
          {obj.user.name}
        </span>
        : {showMessage(obj.chat)}
      </p>
    );
  };

  React.useEffect(() => {
    socket.on("chatHistory", function (chatArray) {
      messagesRef.current = chatArray;
      setMessages(messagesRef.current);
    });
  });

  const renderMessages = (messages) => {
    return messages.map((e) => <Message key={e.id} obj={e} user={user} />);
  };

  const renderRoom = (roomId) => {
    for (let i = 0; i < rooms.length; i++)
      if (rooms[i]._id === roomId) return rooms[i].room;
  };

  return (
    <div>
      <div className="container main-section" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-3 pr-5 mr-2">
            <div className="row my-3"></div>
            <div className="chat-room">
              <Rooms
                rooms={rooms}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
              />
            </div>
            <div className="row my-3"></div>
          </div>

          <nav>
            <span className="welcom">{user ? `Welcome ${user.name}` : ""}</span>
          </nav>

          <div className="chat-room">
            <div id="inputArea" className="px-3">
              <div className="chat">
                <div className="chat-mess">{renderMessages(messages)}</div>

                <div>
                  <form onSubmit={handleChatSubmit} id="chatform">
                    <input
                      className="msg"
                      name="chat"
                      placeholder="chat with me"
                    />
                    <input
                      className="send-msg"
                      type="submit"
                      value="Send message"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default SocketGamePage;
