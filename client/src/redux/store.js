import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const token = localStorage.getItem("broom_token")
  ? localStorage.getItem("broom_token")
  : null;
// Refresh authentication Check
var auth = {};
if (token === null) {
  console.log("i am Null");
  auth.isAuthenticated = false;
  auth.token = null;
  auth.user = null;
  auth.loading = false;
  auth.error = null;
} else {
  // Authentication Request needs to send to server
  auth.token = token;
}

const initialState = {
  auth: auth,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
