import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";

const Room = () => {
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

  //  Limit the number of digits in the input
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-item-center">
      <div className="room-pin mt-5">
        <form action="">
          <input
            type="text"
            className="form-control fs-3 text-center"
            placeholder="Enter 4 Digit Code"
            maxLength="4"
            onInput={maxLengthCheck}
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </form>
      </div>
      <button
        className="bg-danger btn  btn-lg mt-2 animate__animated animate__pulse animate__infinite"
        onClick={signIn}
      >
        Join Game
      </button>
      <h1 className="text-center mt-2 fw-bold">OR</h1>
      <button
        className="btn bg-primary btn-lg mt-2 "
        onClick={() => navigate("/createroom")}
      >
        Start Game
      </button>
    </div>
  );
};

export default Room;
