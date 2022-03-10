import {
  ADD_TRIED_DATA,
  REMOVE_TRIED_DATA,
  TRIED_DATA,
  UPDATE_TRIED,
  WIPE_ALL_DATA,
} from "../actions";
import { TriedRestaurant } from "../Type";
import { AnyAction } from "redux";

export const triedDataReducer = (
  state: TriedRestaurant[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case TRIED_DATA:
      return (state = [...action.payload]);
    case ADD_TRIED_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TRIED_DATA:
      return (state = state.filter((item) => item.id !== action.payload));
    case UPDATE_TRIED:
      const stateClone = [...state];
      const updatedEntry = stateClone.find((item) => {
        return item.id === action.id;
      });
      updatedEntry!.description = action.payload.description;
      updatedEntry!.name = action.payload.name;

      return [...stateClone];
    case WIPE_ALL_DATA:
      return (state = []);
    default:
      return state;
  }
};
