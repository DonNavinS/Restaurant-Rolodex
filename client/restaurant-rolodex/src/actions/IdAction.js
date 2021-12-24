const { UPDATE_USER_ID } = require(".");

export const idAction = (id) => {
  return {
    type: UPDATE_USER_ID,
    payload: id,
  };
};
