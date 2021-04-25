import {
  MESSAGE_FETCH_REQUEST,
  MESSAGE_FETCH_SUCCESS,
  MESSAGE_FETCH_FAIL,
  MESSAGE_FETCH_RESET,
  MESSAGE_UPDATE_REQUEST,
  MESSAGE_UPDATE_SUCCESS,
  MESSAGE_UPDATE_FAIL,
  MESSAGE_UPDATE_RESET,
} from "./../constant/messageConstant";
import axios from "./../../helper/axios";

export const messageFetch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_FETCH_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.get("/util/message", options);
    dispatch({
      type: MESSAGE_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: MESSAGE_FETCH_RESET,
      });
    }, 1000);
  }
};

export const messageUpdate = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_UPDATE_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.get(`/util/message/${id}`, options);
    dispatch({
      type: MESSAGE_UPDATE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: MESSAGE_UPDATE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: MESSAGE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: MESSAGE_UPDATE_RESET,
      });
    }, 1000);
  }
};
