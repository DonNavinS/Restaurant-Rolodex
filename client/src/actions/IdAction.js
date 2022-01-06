import { UPDATE_USER_ID } from "./index";

export const idAction = (id) => {
  return {
    type: UPDATE_USER_ID,
    payload: id,
  };
};
