import axios from "axios";

const BASE_URL = "https://xn----7sbhlqzghjcdke5k.xn--p1ai/api";
// const BASE_URL = "http://localhost:6001/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
