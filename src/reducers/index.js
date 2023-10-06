import { combineReducers } from "redux";

import socketReducer from "./socket";
import authReducer from "./auth";
import roomReducer from "./room";
import gameReducer from "./game";

export default combineReducers({
  socketReducer,
  authReducer,
  roomReducer,
  gameReducer,
});
