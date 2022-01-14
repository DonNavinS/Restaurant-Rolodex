import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { idReducer } from "./idReducer";
import { totalDataReducer } from "./totalDataReducer";
import { triedDataReducer } from "./triedDataReducer";
import usernameReducer from "./usernameReducer";

const allReducers = combineReducers({
  auth: authReducer,
  username: usernameReducer,
  user_id: idReducer,
  totalData: totalDataReducer,
  triedData: triedDataReducer,
});

export default allReducers;
