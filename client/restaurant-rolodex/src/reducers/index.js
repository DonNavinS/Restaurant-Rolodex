import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usernameReducer from "./usernameReducer";

const allReducers = combineReducers({
  auth: authReducer,
  username: usernameReducer,
});

export default allReducers;
