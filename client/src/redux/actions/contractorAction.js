import {
  CONTRACTOR_ADD_REQUEST,
  CONTRACTOR_ADD_SUCCESS,
  CONTRACTOR_ADD_FAIL,
  CONTRACTOR_ADD_RESET,
  CONTRACTOR_FETCH_REQUEST,
  CONTRACTOR_FETCH_SUCCESS,
  CONTRACTOR_FETCH_FAIL,
  CONTRACTOR_FETCH_RESET,
  CONTRACTOR_UPDATE_REQUEST,
  CONTRACTOR_UPDATE_SUCCESS,
  CONTRACTOR_UPDATE_FAIL,
  CONTRACTOR_UPDATE_RESET,
  CONTRACTOR_ENABLE_REQUEST,
  CONTRACTOR_ENABLE_SUCCESS,
  CONTRACTOR_ENABLE_FAIL,
  CONTRACTOR_ENABLE_RESET,
  CONTRACTOR_DISABLE_REQUEST,
  CONTRACTOR_DISABLE_SUCCESS,
  CONTRACTOR_DISABLE_FAIL,
  CONTRACTOR_DISABLE_RESET,
} from "./../constant/contractorConstant";
import axios from "./../../helper/axios";
export const contractorFetch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACTOR_FETCH_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.get("/contractor", options);
    dispatch({
      type: CONTRACTOR_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACTOR_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_FETCH_RESET,
      });
    }, 1000);
  }
};

export const contractorAdd = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACTOR_ADD_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.post("/contractor", { ...info }, options);
    dispatch({
      type: CONTRACTOR_ADD_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_ADD_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: CONTRACTOR_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_ADD_RESET,
      });
    }, 1000);
  }
};

export const contractorUpdate = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACTOR_UPDATE_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.put("/contractor", { ...info }, options);
    dispatch({
      type: CONTRACTOR_UPDATE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_UPDATE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: CONTRACTOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_UPDATE_RESET,
      });
    }, 1000);
  }
};

export const contractorEnable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACTOR_ENABLE_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.put(`/contractor/enable/${id}`, {}, options);
    dispatch({
      type: CONTRACTOR_ENABLE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_ENABLE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: CONTRACTOR_ENABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_ENABLE_RESET,
      });
    }, 1000);
  }
};

export const contractorDisable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTRACTOR_DISABLE_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.put(`/contractor/disable/${id}`, {}, options);
    dispatch({
      type: CONTRACTOR_DISABLE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_DISABLE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: CONTRACTOR_DISABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CONTRACTOR_DISABLE_RESET,
      });
    }, 1000);
  }
};
