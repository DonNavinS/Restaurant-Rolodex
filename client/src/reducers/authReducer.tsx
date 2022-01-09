import { LOGGED_IN, LOGGED_OUT } from "../actions";
import { AnyAction } from "redux";

export type ActionObject = {};

const authReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOGGED_IN:
      return (state = true);
    case LOGGED_OUT:
      return (state = false);
    default:
      return state;
  }
};

export default authReducer;
