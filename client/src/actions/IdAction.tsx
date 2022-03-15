import { UPDATE_USER_ID } from "./index";

export const idAction = (id: number) => {
  return {
    type: UPDATE_USER_ID,
    payload: id,
  };
};
