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

export const contractorFetchReducer = (
  state = { error: null, loading: false, contractors: [] },
  action
) => {
  switch (action.type) {
    case CONTRACTOR_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRACTOR_FETCH_SUCCESS:
      return {
        ...state,
        contractors: action.payload,
        loading: false,
      };
    case CONTRACTOR_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CONTRACTOR_FETCH_RESET:
      return {
        error: null,
        loading: false,
        contractors: [],
      };

    default:
      return state;
  }
};

export const contractorAddReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case CONTRACTOR_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRACTOR_ADD_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case CONTRACTOR_ADD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CONTRACTOR_ADD_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const contractorUpdateReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case CONTRACTOR_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRACTOR_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case CONTRACTOR_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CONTRACTOR_UPDATE_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const contractorEnableReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case CONTRACTOR_ENABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRACTOR_ENABLE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case CONTRACTOR_ENABLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CONTRACTOR_ENABLE_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export const contractorDisableReducer = (
  state = { error: null, loading: false, success: false },
  action
) => {
  switch (action.type) {
    case CONTRACTOR_DISABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRACTOR_DISABLE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case CONTRACTOR_DISABLE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CONTRACTOR_DISABLE_RESET:
      return {
        error: null,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
