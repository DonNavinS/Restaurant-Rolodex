import axios from "axios";
import { apiBaseURL } from "../config";
import { store } from "../store";

export const apiClient = axios.create({
  baseURL: `${apiBaseURL}/api`,
  headers: {
    authorization: `Bearer ${store.getState().token}`,
  },
});

export const apiClientLogin = axios.create({
  baseURL: `${apiBaseURL}/api`,
});
