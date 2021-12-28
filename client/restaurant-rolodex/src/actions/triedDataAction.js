import {
  ADD_TRIED_DATA,
  REMOVE_TRIED_DATA,
  TRIED_DATA,
  UPDATE_TRIED_DESCRIPTION,
  UPDATE_TRIED_NAME,
} from ".";

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

export const updateTriedName = (id, name) => {
  return {
    type: UPDATE_TRIED_NAME,
    id: id,
    payload: name,
  };
};

export const updateTriedDescription = (id, description) => {
  return {
    type: UPDATE_TRIED_DESCRIPTION,
    id: id,
    payload: description,
  };
};
