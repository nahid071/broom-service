import {
  FILE_UPLOADING,
  UPLOAD_PROGRESS,
  UPLOAD_DONE,
  UPLOAD_FAIL,
  UPLOAD_RESET,
} from "./../constant/utilConstant";
import { storage } from "./../../helper/firebase";

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
