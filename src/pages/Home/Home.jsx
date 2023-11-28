import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";
import "./Home.css"; // Import the CSS file
import glass from "../../assets/glass-removebg-preview.png";

const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState();

  const JoinRoom = (e) => {
    e.preventDefault();
    axios
      .post("/rooms/enterroom", { roomCode: roomCode })
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          notify("Joined Room, pick a username");
          localStorage.setItem("@guestId", res.data.guestId);
          navigate(`/guestsignup/${roomCode}`);
        } else {
          notify(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };

  return (
    <div className="all-container">
      <div className="board"></div>
      <h1 className="neonText"> Bachelor Quiz </h1>
      <div className="container">
        <input
          type="text"
          className="form-control"
          placeholder="Game PIN"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={4}
        ></input>

        <button className="button-join" onClick={JoinRoom}>
          Enter
        </button>
      </div>
      <img src={glass} alt="" className="glass-image" />

      <footer>
        <p id="line-create">
          To create a game{" "}
          <button id="href-button" onClick={() => navigate("/signup")}>
            signup{" "}
          </button>{" "}
          or{" "}
          <button id="href-button" onClick={() => navigate("/login")}>
            login
          </button>
        </p>
      </footer>
    </div>
  );
};

export default Home;
