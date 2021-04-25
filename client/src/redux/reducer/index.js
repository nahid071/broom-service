import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";

import {
  contractorFetchReducer,
  contractorAddReducer,
  contractorUpdateReducer,
  contractorEnableReducer,
  contractorDisableReducer,
} from "./contractorReducer";

import {
  fileUploadReducer,
  aboutUpdateReducer,
  aboutFetchReducer,
} from "./../reducer/utilReducer";

import {
  messageFetchReducer,
  messageUpdateReducer,
} from "./../reducer/messageReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  // File upload
  upload: fileUploadReducer,

  // contractors
  contractorFetch: contractorFetchReducer,
  contractorAdd: contractorAddReducer,
  contractorUpdate: contractorUpdateReducer,
  contractorEnable: contractorEnableReducer,
  contractorDisable: contractorDisableReducer,

  // about
  aboutUpdate: aboutUpdateReducer,
  aboutFetch: aboutFetchReducer,

  //message
  messageFetch: messageFetchReducer,
  messageUpdate: messageUpdateReducer,
});

export default rootReducer;
