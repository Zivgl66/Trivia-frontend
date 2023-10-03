import { CREATE_ROOM, FETCH_ROOM, ADD_PLAYER } from "../constants/actionTypes";

const roomReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      console.log(action.payload);
      localStorage.setItem("@room", JSON.stringify({ ...action?.payload }));
      return { ...state, rooms: [...state.rooms, action.payload] };
    case FETCH_ROOM:
      return { ...state, room: action.payload.room };
    case ADD_PLAYER:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
      };
    default:
      return state;
  }
};

export default roomReducer;
