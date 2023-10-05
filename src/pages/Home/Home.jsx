import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/functions";
import "./Home.css"; // Import the CSS file
import glass from "../../assets/glass-removebg-preview.png";
import { addPlayer } from "../../actions/room";

const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState();
  const socket = useSelector((state) => state.socketReducer.socket);

  const JoinRoom = (e) => {
    e.preventDefault();
    axios
      .post("/rooms/enterroom", { roomCode: roomCode })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
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

  // const joinGame = (e) => {
  //   e.preventDefault();
  //   socket.emit();
  // };
  // const enteringGuest = (e) => {
  //   if (roomCode.length == 4) {
  //     e.preventDefault();
  //     axios
  //       .get("/rooms/")
  //       .then((res) => {
  //         if (res.data.status === "success") {
  //           console.log(res.data.message);
  //           for (let x = 0; x < res.data.rooms.length; x++) {
  //             if (res.data.rooms[x].roomCode === roomCode) {
  //               notify(res.data.roomCode);
  //               navigate("/guestsignup");
  //             }
  //           }
  //         } else {
  //           notify(res.data.message);
  //           console.log(res.data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("error axios: ", err);
  //       });
  //   } else {
  //     alert("Invalid, please try again");
  //     setRoomCode("");
  //   }
  // };

  const createGame = (e) => {
    e.preventDefault();
    console.log("create game! comming soon");
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
          To create a game
          <a href="/home" id="create-game" onClick={createGame}>
            click here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
