import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import WaitingRoom from "../WaitingRoom/WaitingRoom";

const HostScreen = () => {
  let { id } = useParams();
  const socket = useSelector((state) => state.socketReducer.socket);

  return (
    <div>
      <h2>Host screen</h2>
      <WaitingRoom socket={socket} />
    </div>
  );
};

export default HostScreen;
