import React, { useEffect, useState } from "react";
import "./WaitingRoom.css"; // Import the CSS file
import axios from "axios";

const WaitingRoom = () => {
  const [room, setRoom] = useState(JSON.parse(localStorage.getItem("@room")));
  // const [guests, setGuests] = useState([]);

  useEffect(() => {
    console.log("room: " + room.roomCode);
  });
  // // Event handler for when a new user joins
  // axios.on("user-joined", (user) => {
  //   // Add the new user's name to the user list
  //   const userList = document.getElementById("user-list");
  //   const listItem = document.createElement("li");
  //   listItem.textContent = user.name; // Assuming user.name contains the user's name
  //   userList.appendChild(listItem);
  // });

  // // Handle disconnect event if needed
  // axios.on("disconnect", () => {
  //   // Handle user disconnection
  // });
  return (
    <div>
      <h1>Game Room</h1>
      <h2>Share this code:{room.roomCode} </h2>
      <div id="waiting-room">
        <h1>Waiting Room</h1>
        <ul id="user-list"></ul>
      </div>
      <script src="script.js"></script>
    </div>
  );
};

export default WaitingRoom;
