import {
  ADD_TOTAL_DATA,
  TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL_NAME,
  UPDATE_TOTAL_DESCRIPTION,
} from "./index";
export const totalDataAction = (data: any) => {
  return {
    type: TOTAL_DATA,
    payload: data,
  };
};

export const addDataAction = (data: any) => {
  return {
    type: ADD_TOTAL_DATA,
    payload: data,
  };
};

export const removeDataAction = (id: number) => {
  return {
    type: REMOVE_TOTAL_DATA,
    payload: id,
  };
};

export const updateTotalDataName = (id: any, data: string) => {
  return {
    type: UPDATE_TOTAL_NAME,
    id: id,
    payload: data,
  };
};

export const updateTotalDataDescription = (id: any, description: string) => {
  return {
    type: UPDATE_TOTAL_DESCRIPTION,
    id: id,
    payload: description,
  };
};
