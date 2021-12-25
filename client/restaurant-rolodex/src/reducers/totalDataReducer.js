import { TOTAL_DATA, ADD_DATA, REMOVE_DATA } from "../actions";

export const totalDataReducer = (state = [], action) => {
  switch (action.type) {
    case TOTAL_DATA:
      console.log(state);
      console.log(action);
      return (state = [...state, ...action.payload]);
    case ADD_DATA:
      console.log(state);
      console.log(action);
      return (state = [...state, action.payload]);
    case REMOVE_DATA:
      return (state = state.filter((item) => item.idtotal !== action.payload));

    default:
      return state;
  }
};
