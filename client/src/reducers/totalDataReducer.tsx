import {
  TOTAL_DATA,
  ADD_TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL_NAME,
  UPDATE_TOTAL_DESCRIPTION,
} from "../actions";
import { AnyAction } from "redux";
import { TotalRestaurant } from "../Type";

export const totalDataReducer = (
  state: TotalRestaurant[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case TOTAL_DATA:
      return (state = [...state, ...action.payload]);
    case ADD_TOTAL_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TOTAL_DATA:
      return (state = state.filter((item) => item.idtotal !== action.payload));

    case UPDATE_TOTAL_NAME:
      const oldName = state.find((item) => {
        return item.idtotal === action.id;
      });
      if (oldName !== undefined) {
        const oldIndex = state.indexOf(oldName);
        const firstHalf = state.slice(0, oldIndex);
        const secondHalf = state.slice(oldIndex + 1, state.length);
        return (state = [
          ...firstHalf,
          {
            idtotal: oldName.idtotal,
            name: action.payload,
            description: oldName.description,
            user_id: oldName.user_id,
          },
          ...secondHalf,
        ]);
      }

    case UPDATE_TOTAL_DESCRIPTION:
      const oldDescription = state.find((item) => item.idtotal === action.id);

      if (oldDescription !== undefined) {
        const prevIndex = state.indexOf(oldDescription);
        const firstHalfDesc = state.slice(0, prevIndex);
        const secondHalfDesc = state.slice(prevIndex + 1, state.length);
        return (state = [
          ...firstHalfDesc,
          {
            idtotal: oldDescription.idtotal,
            name: oldDescription.name,
            description: action.payload,
            user_id: oldDescription.user_id,
          },
          ...secondHalfDesc,
        ]);
      }
    default:
      return state;
  }
};
