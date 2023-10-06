import * as api from "../api"
import {
  FETCH_ALL_QUIZES,
  FETCH_PUBLIC_QUIZES,
  FETCH_TEACHER_QUIZES,
  CREATE_QUIZ,
  UPDATE_QUIZ,
  LIKE_QUIZ,
  DELETE_QUIZ,
  FETCH_QUIZ,
  FETCH_QUIZES_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_QUIZ
} from "../constants/actionTypes"

export const getQuizes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuizes()
    dispatch({ type: FETCH_ALL_QUIZES, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getPublicQuizes = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPublicQuizes(page)
    dispatch({
      type: FETCH_PUBLIC_QUIZES,
      payload: { data, currentPage, numberOfPages },
    })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getQuizesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchQuizesBySearch(searchQuery)
    dispatch({ type: FETCH_QUIZES_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getTeacherQuizes = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchTeacherQuizes(id)
    dispatch({ type: FETCH_TEACHER_QUIZES, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestions()
    dispatch({ type: FETCH_ALL_QUIZES, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createQuiz = (quiz, history) => async (dispatch) => {
  try {
    const { data } = await api.createQuiz(quiz)