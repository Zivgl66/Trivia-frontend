import React, { useEffect, useState } from "react";

const Room = () => {
  const [roomCode, setRoomCode] = useState("");
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    let room = localStorage.getItem("@roomCode");
    setRoomCode(room);
  });

  return (
    <div>
      <h1>Game Room</h1>
      <h2>Share this code: {roomCode}</h2>
    </div>
  );
};

export default Room;
