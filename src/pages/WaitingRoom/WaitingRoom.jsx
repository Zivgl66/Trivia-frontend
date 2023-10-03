import React, { useEffect, useState } from "react";
import "./WaitingRoom.css"; // Import the CSS file
import axios from "axios";

const WaitingRoom = () => {
  const [roomCode, setRoomCode] = useState("");

  useState(() => {
    // let room = localStorage.getItem("@roomCode");

    setRoomCode(roomCode);
  });

  return (
    <div className="container-waiting">
      <fieldset class="centered-text">
        <legend>Your Text Here</legend>
        <p>This is the text inside the fieldset.</p>
      </fieldset>
    </div>
  );
};

export default WaitingRoom;
