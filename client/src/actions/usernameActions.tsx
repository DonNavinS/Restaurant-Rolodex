import { REMOVE_USERNAME, UPDATE_USERNAME } from "./index";
export const usernameAction = (username: string) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export const removeUsernameAction = () => {
  return {
    type: REMOVE_USERNAME,
  };
};
