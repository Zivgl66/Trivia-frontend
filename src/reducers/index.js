import { combineReducers } from "redux";

import socket from "./socket";
import authReducer from "./auth";
import roomReducer from "./room";

export default combineReducers({
  socket,
  authReducer,
  roomReducer,
});
