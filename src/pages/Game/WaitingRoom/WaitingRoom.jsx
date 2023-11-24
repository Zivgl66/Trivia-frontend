import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function WaitingRoom({ socket, startGame }) {
  const [playerList, setPlayerList] = useState([]);
  const [roomCode, setRoomCode] = useState(
    JSON.parse(localStorage.getItem("@room")).roomCode
  );

  useEffect(() => {
    socket.on("player-added", (player) => {
      // console.log("new player: " + player.guestPicture);
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
            <>
              <ol>
                {playerList.map((player, index) => (
                  <li key={index + player.guestName}>
                    <h3>
                      <mark>{player.guestName}</mark>
                      <img
                        src={player.guestPicture}
                        width={"30px"}
                        style={{ borderRadius: "25px", marginLeft: "5px" }}
                      />
                    </h3>
                  </li>
                ))}
              </ol>
              <button onClick={startGame}>Start Game</button>
            </>
          ) : (
            <h1>Waiting for players to join...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
