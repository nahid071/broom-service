import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";

import { fileUploadReducer } from "./../reducer/utilReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  // File upload
  upload: fileUploadReducer,
});

export default rootReducer;
