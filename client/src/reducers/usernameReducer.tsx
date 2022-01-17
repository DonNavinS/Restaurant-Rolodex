import { REMOVE_USERNAME, UPDATE_USERNAME } from "../actions/index";
import { AnyAction } from "redux";

const usernameReducer = (state = "", action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return (state = action.payload);
    case REMOVE_USERNAME:
      return (state = "");
    default:
      return state;
  }
};

export default usernameReducer;
