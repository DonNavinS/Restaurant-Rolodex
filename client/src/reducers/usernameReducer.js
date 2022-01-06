import { UPDATE_USERNAME } from "../actions/index";

const usernameReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return (state = action.payload);
    default:
      return state;
  }
};

export default usernameReducer;
