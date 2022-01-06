import { UPDATE_USER_ID } from "../actions";

export const idReducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_USER_ID:
      return (state = action.payload);
    default:
      return state;
  }
};
