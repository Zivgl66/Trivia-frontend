import { combineReducers } from "redux";

import socketReducer from "./socket";
import authReducer from "./auth";
import roomReducer from "./room";
import gameReducer from "./game";
import playerResultsReducer from "./playerResults";
import leaderboardReducer from "./leaderboard";

export default combineReducers({
  socketReducer,
  authReducer,
  roomReducer,
  gameReducer,
  playerResultsReducer,
  leaderboardReducer,
});
