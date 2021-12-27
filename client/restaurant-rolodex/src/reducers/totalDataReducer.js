import {
  TOTAL_DATA,
  ADD_TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL_DATA,
} from "../actions";

export const totalDataReducer = (state = [], action) => {
  switch (action.type) {
    case TOTAL_DATA:
      return (state = [...state, ...action.payload]);
    case ADD_TOTAL_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TOTAL_DATA:
      return (state = state.filter((item) => item.idtotal !== action.payload));
    case UPDATE_TOTAL_DATA:
      const oldValue = state.find((item) => {
        return item.idtotal === action.id;
      });
      const oldIndex = state.indexOf(oldValue);
      const firstHalf = state.slice(0, oldIndex);
      const secondHalf = state.slice(oldIndex + 1, state.length);
      return (state = [
        ...firstHalf,
        {
          idtotal: oldValue.idtotal,
          name: action.payload,
          description: oldValue.description,
          user_id: oldValue.user_id,
        },
        ...secondHalf,
      ]);
    // return (state = [
    //   ...state.filter((item) => item.idtotal !== oldValue.idtotal),
    //   {
    //     idtotal: oldValue.idtotal,
    //     name: action.payload,
    //     description: oldValue.description,
    //     user_id: oldValue.user_id,
    //   },
    // ]);
    default:
      return state;
  }
};
