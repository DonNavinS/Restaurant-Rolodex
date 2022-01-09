import {
  ADD_TRIED_DATA,
  REMOVE_TRIED_DATA,
  TRIED_DATA,
  UPDATE_TRIED_DESCRIPTION,
  UPDATE_TRIED_NAME,
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

export const updateTriedName = (id: any, name: string) => {
  return {
    type: UPDATE_TRIED_NAME,
    id: id,
    payload: name,
  };
};

export const updateTriedDescription = (id: any, description: string) => {
  return {
    type: UPDATE_TRIED_DESCRIPTION,
    id: id,
    payload: description,
  };
};

export const wipeTriedData = () => {
  return {
    type: WIPE_ALL_DATA,
  };
};
