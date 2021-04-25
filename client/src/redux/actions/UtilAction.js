import {
  FILE_UPLOADING,
  UPLOAD_PROGRESS,
  UPLOAD_DONE,
  UPLOAD_FAIL,
  UPLOAD_RESET,

  // about
  // abOUT
  ABOUT_FETCH_REQUEST,
  ABOUT_FETCH_SUCCESS,
  ABOUT_FETCH_FAIL,
  ABOUT_FETCH_RESET,
  ABOUT_UPDATE_REQUEST,
  ABOUT_UPDATE_SUCCESS,
  ABOUT_UPDATE_FAIL,
  ABOUT_UPDATE_RESET,
} from "./../constant/utilConstant";
import { storage } from "./../../helper/firebase";
import axios from "./../../helper/axios";
import moment from "moment";

export const fileUpload = (file) => (dispatch) => {
  let filename =
    moment.now() +
      "." +
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) ||
    file.name;
  // Enable Loading
  dispatch({
    type: FILE_UPLOADING,
  });
  const upload = storage.ref(`somity/${filename}`).put(file);
  upload.on(
    "state_changed",
    (snapshot) => {
      const prograse = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      dispatch({
        type: UPLOAD_PROGRESS,
        payload: prograse,
      });
    },
    (error) => {
      dispatch({
        type: UPLOAD_FAIL,
        payload: error,
      });
    },
    () => {
      storage
        .ref("somity")
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          dispatch({
            type: UPLOAD_PROGRESS,
            payload: 0,
          });
          dispatch({
            type: UPLOAD_DONE,
            payload: url,
          });
        });
    }
  );
};

export const uploadReset = () => (dispatch) => {
  dispatch({
    type: UPLOAD_RESET,
  });
};

export const aboutUpdate = (info) => async (dispatch, getState) => {
  try {
    dispatch({ type: ABOUT_UPDATE_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.post("/util/about", { ...info }, options);
    dispatch({
      type: ABOUT_UPDATE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: ABOUT_UPDATE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: ABOUT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: ABOUT_UPDATE_RESET,
      });
    }, 1000);
  }
};

export const aboutFetch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ABOUT_FETCH_REQUEST });
    const { token } = getState().auth;
    const options = { headers: { "auth-token": token } };
    const { data } = await axios.get("/util/about", options);
    dispatch({
      type: ABOUT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ABOUT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: ABOUT_FETCH_RESET,
      });
    }, 1000);
  }
};
