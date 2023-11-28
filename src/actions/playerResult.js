import axios from "axios";
import * as api from "../api";

import {
  CREATE_PLAYER_RESULT,
  FETCH_PLAYER_RESULT,
  ADD_ANSWER,
} from "../constants/actionTypes";

export const createPlayerResult = (playerResult) => async (dispatch) => {
  try {
    // console.log("player result sent: " + JSON.stringify(playerResult));
    const { data } = await api.createPlayerResult(playerResult);
    // console.log("player result data from api1: " + JSON.stringify(data));
    dispatch({ type: CREATE_PLAYER_RESULT, payload: data.playerResult });
  } catch (error) {
    console.log(error);
  }
};


export const getPlayerResult = (id) => async (dispatch) => {
  try {
    // console.log("id sent: ", id);
    const { data } = await api.fetchPlayerResult(id);
    // console.log(
    //   "player result data from api: " + JSON.stringify(data.playerResult)
    // );
    dispatch({
      type: FETCH_PLAYER_RESULT,
      payload: { playerResult: data.playerResult[0] },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addAnswer = (newAnswer, id) => async (dispatch) => {
  try {
    const { data } = await api.addAnswer(newAnswer, id);
    // console.log("data from add answer: " + JSON.stringify(data));
    dispatch({ type: ADD_ANSWER, payload: data.playerResult });
    return data.playerResult;
  } catch (error) {
    console.log(error);
  }
};
