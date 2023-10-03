import * as api from "../api";
import { CREATE_ROOM, FETCH_ROOM, ADD_PLAYER } from "../constants/actionTypes";

export const createroom = (roomData, history) => async (dispatch) => {
  try {
    const { data } = await api.createRoom(roomData);
    dispatch({ type: CREATE_ROOM, payload: data });
    history.push(`/rooms/host/${data._id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getroom = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchRoom(id);
    dispatch({ type: FETCH_ROOM, payload: { room: data } });
  } catch (error) {
    console.log(error);
  }
};

export const addPlayer = (roomId, playerId) => async (dispatch) => {
  try {
    const { data } = await api.addPlayer(roomId, playerId);
    dispatch({ type: ADD_PLAYER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
