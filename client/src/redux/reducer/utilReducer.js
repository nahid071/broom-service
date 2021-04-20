import {
  FILE_UPLOADING,
  UPLOAD_PROGRESS,
  UPLOAD_DONE,
  UPLOAD_FAIL,
  UPLOAD_RESET,
} from "./../constant/utilConstant";

export const fileUploadReducer = (
  state = {
    uploading: false,
    progress: 0,
    done: false,
    url: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case FILE_UPLOADING:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case UPLOAD_DONE:
      return {
        ...state,
        progress: 0,
        done: true,
        uploading: false,
        url: action.payload,
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        progress: 0,
        uploading: false,
        url: null,
        error: action.payload,
      };
    case UPLOAD_RESET:
      return {
        ...state,
        progress: 0,
        done: false,
        uploading: false,
        url: null,
        error: null,
      };

    default:
      return state;
  }
};
