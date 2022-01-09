import { UPDATE_USER_ID } from "../actions";
import { AnyAction } from "redux";

export const idReducer = (state = null, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_ID:
      return (state = action.payload);
    default:
      return state;
  }
};
