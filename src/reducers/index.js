import { combineReducers } from "redux";

import socket from "./socket";
import authReducer from "./auth";

export default combineReducers({
  socket,
  authReducer,
});
