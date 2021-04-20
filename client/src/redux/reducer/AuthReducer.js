import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_RESET,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_FAIL,
} from "./../constant/authConstant";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
    case TOKEN_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
    case TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user,
      };
    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        isAdmin: null,
        user: null,
        error: action.payload,
      };
    case SIGNUP_RESET:
    case TOKEN_VERIFY_FAIL:
    case SIGNIN_RESET:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        isAdmin: null,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
