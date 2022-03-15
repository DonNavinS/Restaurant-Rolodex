import { UPDATE_TOKEN } from "../actions";
import { AnyAction } from "redux";

export const tokenReducer = (state = null, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return (state = action.payload);
    default:
      return state;
  }
};
