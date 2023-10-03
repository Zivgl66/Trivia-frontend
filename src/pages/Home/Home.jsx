import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";
import "./Home.css"; // Import the CSS file
import glass from "../../assets/glass-removebg-preview.png";
const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState();

  const signIn = (e) => {
    e.preventDefault();
    axios
      .post("/rooms/enterroom", { roomCode: roomCode })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.message);
          notify("Joined Room, pick a username");
          navigate("/signup");
        } else {
          notify(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };
  //2Z8N
  const enteringGuest = (e) => {
    if (roomCode.length == 4) {
      e.preventDefault();
      axios
        .get("/rooms/")
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data.message);
            for (let x = 0; x < res.data.rooms.length; x++) {
              if (res.data.rooms[x].roomCode === roomCode) {
                notify(res.data.roomCode);
                navigate("/guestsignup");
              }
            }
          } else {
            notify(res.data.message);
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log("error axios: ", err);
        });
    } else {
      alert("Invalid, please try again");
      setRoomCode("");
    }
  };

  return (
    <div class="all-container">
      <div class="board"></div>
      <h1 className="neonText"> Bachelor Quiz </h1>
      <div class="container">
        <input
          type="text"
          class="form-control"
          placeholder="Game PIN"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={4}
        ></input>

        <button class="button-join" onClick={enteringGuest}>
          {" "}
          Enter
        </button>
      </div>
      <img src={glass} alt="" class="glass-image" />

      <footer>
        <p id="line-create">
          To create a game{" "}
          <a href="/home" id="create-game" onClick={signIn}>
            click here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
