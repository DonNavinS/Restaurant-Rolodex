import { UPDATE_USERNAME } from "../actions/index";
import { AnyAction } from "redux";

const usernameReducer = (state = "", action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return (state = action.payload);
    default:
      return state;
  }
};

export default usernameReducer;
