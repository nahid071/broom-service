import {
  FILE_UPLOADING,
  UPLOAD_PROGRESS,
  UPLOAD_DONE,
  UPLOAD_FAIL,
  UPLOAD_RESET,

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

export const aboutFetchReducer = (
  state = { error: null, loading: false, about: {} },
  action
) => {
  switch (action.type) {
    case ABOUT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ABOUT_FETCH_SUCCESS:
      return {
        ...state,
        about: action.payload,
        loading: false,
      };
    case ABOUT_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ABOUT_FETCH_RESET:
      return {
        error: null,
        loading: false,
        about: {},
      };

    default:
      return state;
  }
};

export const aboutUpdateReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case ABOUT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ABOUT_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ABOUT_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ABOUT_UPDATE_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
