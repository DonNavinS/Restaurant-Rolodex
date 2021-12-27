import { ADD_TRIED_DATA, REMOVE_TRIED_DATA, TRIED_DATA } from ".";

export const triedDataAction = (data) => {
  return {
    type: TRIED_DATA,
    payload: data,
  };
};

export const addTriedDataAction = (data) => {
  return {
    type: ADD_TRIED_DATA,
    payload: data,
  };
};

export const removeTriedDataAction = (id) => {
  return {
    type: REMOVE_TRIED_DATA,
    payload: id,
  };
};
