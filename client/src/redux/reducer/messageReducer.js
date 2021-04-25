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

export const messageFetchReducer = (
  state = { error: null, loading: false, messages: [] },
  action
) => {
  switch (action.type) {
    case MESSAGE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MESSAGE_FETCH_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };
    case MESSAGE_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case MESSAGE_FETCH_RESET:
      return {
        error: null,
        loading: false,
        messages: [],
      };

    default:
      return state;
  }
};

export const messageUpdateReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case MESSAGE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MESSAGE_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case MESSAGE_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case MESSAGE_UPDATE_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
