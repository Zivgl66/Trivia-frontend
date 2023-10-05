import { CREATE_SOCKET } from "../constants/actionTypes";

const socketReducer = (state = { socket: null }, action) => {
  switch (action.type) {
    case CREATE_SOCKET:
      console.log("socket: ", action.payload);
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};

export default socketReducer;
