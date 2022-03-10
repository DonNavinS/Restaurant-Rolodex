import {
  ADD_TOTAL_DATA,
  TOTAL_DATA,
  REMOVE_TOTAL_DATA,
  UPDATE_TOTAL,
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

export const updateTotalData = (
  id: number,
  name: string,
  description: string
) => {
  return {
    type: UPDATE_TOTAL,
    id: id,
    payload: {
      name: name,
      description: description,
    },
  };
};
