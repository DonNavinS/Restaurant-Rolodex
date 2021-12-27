import {
  ADD_TOTAL_DATA,
  TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL_DATA,
} from ".";
export const totalDataAction = (data) => {
  return {
    type: TOTAL_DATA,
    payload: data,
  };
};

export const addDataAction = (data) => {
  return {
    type: ADD_TOTAL_DATA,
    payload: data,
  };
};

export const removeDataAction = (id) => {
  return {
    type: REMOVE_TOTAL_DATA,
    payload: id,
  };
};

export const updateTotalDataAction = (id, data) => {
  return {
    type: UPDATE_TOTAL_DATA,
    id: id,
    payload: data,
  };
};
