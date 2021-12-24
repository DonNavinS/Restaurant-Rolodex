const { UPDATE_USERNAME } = require(".");

const usernameAction = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export default usernameAction;
