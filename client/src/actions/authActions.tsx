import { LOGGED_IN, LOGGED_OUT } from "./index";

export const loginAction = () => {
  return {
    type: LOGGED_IN,
  };
};

export const logoutAction = () => {
  return {
    type: LOGGED_OUT,
  };
};
