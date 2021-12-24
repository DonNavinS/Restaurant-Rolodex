import { createStore } from "redux";
import allReducers from "./reducers";

const initialState = {};
const rootReducer = allReducers;

export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
