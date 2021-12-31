import {
  ADD_TRIED_DATA,
  REMOVE_TRIED_DATA,
  TRIED_DATA,
  UPDATE_TRIED_DESCRIPTION,
  UPDATE_TRIED_NAME,
} from "../actions";

export const triedDataReducer = (state = [], action) => {
  switch (action.type) {
    case TRIED_DATA:
      return (state = [...state, ...action.payload]);
    case ADD_TRIED_DATA:
      return (state = [...state, action.payload]);
    case REMOVE_TRIED_DATA:
      return (state = state.filter((item) => item.idtried !== action.payload));
    case UPDATE_TRIED_NAME:
      const oldName = state.find((item) => item.idtried === action.id);
      const oldNameIndex = state.indexOf(oldName);
      const firstHalfName = state.slice(0, oldNameIndex);
      const secondHalfName = state.slice(oldNameIndex + 1, state.length);
      return (state = [
        ...firstHalfName,
        {
          idtried: oldName.idtried,
          name: action.payload,
          description: oldName.description,
          user_id: oldName.user_id,
        },
        ...secondHalfName,
      ]);
    case UPDATE_TRIED_DESCRIPTION:
      const oldDescription = state.find((item) => item.idtried === action.id);
      const oldDescriptionIndex = state.indexOf(oldDescription);
      const firstHalfDesc = state.slice(0, oldDescriptionIndex);
      const secondHalfDesc = state.slice(oldDescriptionIndex + 1, state.length);
      return (state = [
        ...firstHalfDesc,
        {
          idtried: oldDescription.idtried,
          name: oldDescription.name,
          description: action.payload,
          user_id: oldDescription.user_id,
        },
        ...secondHalfDesc,
      ]);

    default:
      return state;
  }
};
