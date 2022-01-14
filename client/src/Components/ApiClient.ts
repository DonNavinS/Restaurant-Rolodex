import axios from "axios";
import { apiBaseURL } from "../config";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
});
