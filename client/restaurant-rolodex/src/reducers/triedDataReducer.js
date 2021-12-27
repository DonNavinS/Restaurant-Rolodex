import { ADD_TRIED_DATA, REMOVE_TRIED_DATA, TRIED_DATA } from "../actions";

export const triedDataReducer = (state = [], action) => {
  switch (action.type) {
    case TRIED_DATA:
      return (state = [...state, ...action.payload]);
    case ADD_TRIED_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TRIED_DATA:
      return (state = state.filter((item) => item.idtried !== action.payload));
    default:
      return state;
  }
};
