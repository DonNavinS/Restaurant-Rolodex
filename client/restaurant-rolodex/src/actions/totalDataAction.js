import { ADD_DATA, TOTAL_DATA, REMOVE_DATA } from ".";
export const totalDataAction = (data) => {
  return {
    type: TOTAL_DATA,
    payload: data,
  };
};

export const addDataAction = (data) => {
  return {
    type: ADD_DATA,
    payload: data,
  };
};

export const removeDataAction = (id) => {
  return {
    type: REMOVE_DATA,
    payload: id,
  };
};
