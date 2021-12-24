import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { idReducer } from "./idReducer";
import usernameReducer from "./usernameReducer";

const allReducers = combineReducers({
  auth: authReducer,
  username: usernameReducer,
  user_id: idReducer,
});

export default allReducers;
