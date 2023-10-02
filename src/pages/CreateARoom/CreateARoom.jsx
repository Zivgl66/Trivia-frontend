import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";

const CreateARoom = () => {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState();

  //  Limit the number of digits in the input
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  //    Handle form submit -send axios post request to create a room
  const handleSubmit = (e) => {
    e.preventDefault();
    let newRoom = {
      roomCode,
      isOpen: true,
      isFull: false,
      numberOfPlayers,
      users: [],
    };
    console.log("Rooms: ", newRoom);
    axios
      .post("/rooms", newRoom)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.status === "success") {
          console.log(res.data.message);
          notify("Share code *" + roomCode + "* so others can join");
          navigate("/signup");
        } else {
          if (res.data.message === "Room already exists") {
            notify("Room already exists");
          }
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error axios: ", err);
      });
  };
  return (
    <div className="co">
      <form action="">
        <input
          type="number"
          className="form-control fs-3 text-center"
          placeholder="Enter 4 Digit Code"
          maxLength="4"
          onInput={maxLengthCheck}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <input
          type="number"
          className="form-control fs-3 text-center mt-3"
          placeholder="Enter Number Of Players"
          maxLength="2"
          onInput={maxLengthCheck}
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(e.target.value)}
        />
      </form>
      <button
        className="bg-danger btn btn-lg mt-3 fs-3 "
        onClick={handleSubmit}
      >
        Create
      </button>
    </div>
  );
};

export default CreateARoom;
