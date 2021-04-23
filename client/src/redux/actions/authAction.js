import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_RESET,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_RESET,
  // RESET_PASSWORD_REQUEST,
  // RESET_PASSWORD_SUCCESS,
  // RESET_PASSWORD_FAIL,
  // RESET_PASSWORD_RESET,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_FAIL,
} from "./../constant/authConstant";
import axios from "./../../helper/axios";

export const signupAction = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const { data } = await axios.post("/auth/signup", { ...info });
    if (data.s) {
      localStorage.setItem("broom_token", data.token);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: SIGNUP_FAIL,
        payload: data.m,
      });

      setTimeout(() => {
        dispatch({
          type: SIGNUP_RESET,
        });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = () => async (dispatch, getState) => {
  dispatch({ type: TOKEN_VERIFY_REQUEST });

  try {
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.post("/auth/verify", { token }, options);
    if (data.s) {
      dispatch({
        type: TOKEN_VERIFY_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: TOKEN_VERIFY_FAIL,
      });
    }
  } catch (error) {
    localStorage.removeItem("broom_token");
    dispatch({
      type: TOKEN_VERIFY_FAIL,
    });
  }
};

export const signInAction = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });
    const { data } = await axios.post("/auth", { ...info });
    if (data.s) {
      localStorage.setItem("broom_token", data.token);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: SIGNIN_FAIL,
        payload: data.m,
      });
      setTimeout(() => {
        dispatch({
          type: SIGNIN_RESET,
        });
      }, 1000);
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: SIGNIN_RESET,
      });
    }, 1000);
  }
};

export const signoutAction = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("broom_token");
    dispatch({
      type: SIGNIN_RESET,
    });
  } catch (error) {
    console.log(error);
  }
};
