import {
  TOTAL_DATA,
  ADD_TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL,
} from "../actions";
import { AnyAction } from "redux";
import { TotalRestaurant } from "../Type";

export const totalDataReducer = (
  state: TotalRestaurant[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case TOTAL_DATA:
      return (state = [...action.payload]);
    case ADD_TOTAL_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TOTAL_DATA:
      return (state = state.filter((item) => item.idtotal !== action.payload));
    case UPDATE_TOTAL:
      const stateClone = [...state];
      const updatedEntry = stateClone.find(
        (item) => item.idtotal === action.id
      );

      updatedEntry!.name = action.payload.name;
      updatedEntry!.description = action.payload.description;

      return [...stateClone];

    default:
      return state;
  }
};
