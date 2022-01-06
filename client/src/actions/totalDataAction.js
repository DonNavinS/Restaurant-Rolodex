import {
  ADD_TOTAL_DATA,
  TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL_NAME,
  UPDATE_TOTAL_DESCRIPTION,
} from "./index";
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

export const updateTotalDataName = (id, data) => {
  return {
    type: UPDATE_TOTAL_NAME,
    id: id,
    payload: data,
  };
};

export const updateTotalDataDescription = (id, description) => {
  return {
    type: UPDATE_TOTAL_DESCRIPTION,
    id: id,
    payload: description,
  };
};
