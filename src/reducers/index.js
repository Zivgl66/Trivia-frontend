import { combineReducers } from "redux";

import socketReducer from "./socket";
import authReducer from "./auth";
import roomReducer from "./room";

export default combineReducers({
  socketReducer,
  authReducer,
  roomReducer,
});
