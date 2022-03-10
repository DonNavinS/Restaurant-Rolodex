import {
  ADD_TRIED_DATA,
  REMOVE_TRIED_DATA,
  TRIED_DATA,
  UPDATE_TRIED,
  WIPE_ALL_DATA,
} from "./index";

export const triedDataAction = (data: any) => {
  return {
    type: TRIED_DATA,
    payload: data,
  };
};

export const addTriedDataAction = (data: any) => {
  return {
    type: ADD_TRIED_DATA,
    payload: data,
  };
};

export const removeTriedDataAction = (id: number) => {
  return {
    type: REMOVE_TRIED_DATA,
    payload: id,
  };
};

export const updateTriedData = (
  id: number,
  name: string,
  description: string
) => {
  return {
    type: UPDATE_TRIED,
    id: id,
    payload: {
      name: name,
      description: description,
    },
  };
};
export const wipeTriedData = () => {
  return {
    type: WIPE_ALL_DATA,
  };
};
