import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";

import {
  contractorFetchReducer,
  contractorAddReducer,
  contractorUpdateReducer,
  contractorEnableReducer,
  contractorDisableReducer,
} from "./contractorReducer";

import { fileUploadReducer } from "./../reducer/utilReducer";
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
});

export default rootReducer;
