import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function WaitingRoom({ socket }) {
  const [playerList, setPlayerList] = useState([]);
  const [roomCode, setRoomCode] = useState(
    JSON.parse(localStorage.getItem("@room")).roomCode
  );

  useEffect(() => {
    socket.on("player-added", (player) => {
      setPlayerList([...playerList, player]);
    });
  }, [playerList, socket]);

  return (
    <div>
      <h1>Waiting Room</h1>
      <h2>
        Share the room code with your friends:
        {roomCode}
      </h2>
      <div>
        <div>
          <h1>Player List:</h1>
          {playerList.length > 0 ? (
            <ol>
              {playerList.map((player) => (
                <li>
                  <h3>
                    <mark>{player.guestName}</mark>
                  </h3>
                </li>
              ))}
            </ol>
          ) : (
            <h1>Waiting for player to join...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
