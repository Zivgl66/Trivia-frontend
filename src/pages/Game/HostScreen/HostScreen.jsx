import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import WaitingRoom from "../WaitingRoom/WaitingRoom";

const HostScreen = () => {
  let { id } = useParams();
  const socket = useSelector((state) => state.socketReducer.socket);
  const game = useSelector((state) => state.gameReducer.game);
  const [waiting, setWaiting] = useState(true);

  const startGame = () => {
    socket.emit("start-game", { game });
    setWaiting(false);
  };
  return (
    <div>
      <h2>Host screen</h2>
      {waiting && <WaitingRoom socket={socket} startGame={startGame} />}
    </div>
  );
};

export default HostScreen;
