import React, { useEffect, useState } from "react";
import "./WaitingRoom.css"; // Import the CSS file

const users = [
  { name: "User 1", image: "user1.jpg" },
  { name: "User 2", image: "user2.jpg" },
];

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  useEffect(() => {
    let room = localStorage.getItem("@roomCode");
    setRoomCode(room);
  });

  // Function to add a new user card
  function addUser(user) {
    const userList = document.getElementById("userList");

    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const userImage = document.createElement("img");
    userImage.src = user.image;
    userImage.alt = user.name;

    const userName = document.createElement("h2");
    userName.textContent = user.name;

    userCard.appendChild(userImage);
    userCard.appendChild(userName);

    userList.appendChild(userCard);
  }
  // Simulate a new user entering every 5 seconds (for demonstration)
  setInterval(() => {
    const newUser = { name: "New User", image: "newuser.jpg" };
    addUser(newUser);
  }, 5000);

  // Initial population of users
  users.forEach((user) => {
    addUser(user);
  });
  return (
    <div>
      <h1>Game Room</h1>
      <h2>Share this code: {roomCode}</h2>
      <div class="waiting-room">
        <h1>Welcome to the Waiting Room</h1>
        <div class="user-list" id="userList"></div>
      </div>
      <script src="script.js"></script>
    </div>
  );
};

export default Room;
