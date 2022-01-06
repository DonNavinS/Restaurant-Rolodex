import { UPDATE_USERNAME } from "./index";
const usernameAction = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export default usernameAction;
