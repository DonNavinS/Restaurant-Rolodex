import { UPDATE_TOKEN } from "./index";

export const updateToken = (token: string) => {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
};
