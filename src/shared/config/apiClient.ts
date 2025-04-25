// src/shared/api/query-client.ts
import axios from "axios";

// Main API for user/admin operations
const MAIN_API_BASE_URL = "https://xn----7sbhlqzghjcdke5k.xn--p1ai/api";
// const MAIN_API_BASE_URL = "http://localhost:6001";

const PARSER_API_BASE_URL =
  "https://xn----7sbhlqzghjcdke5k.xn--p1ai/api-parser";
// const PARSER_API_BASE_URL = "http://localhost:6002/parser";

// Main API client
export const apiClient = axios.create({
  baseURL: MAIN_API_BASE_URL,
  withCredentials: true,
});

// Parser API client
export const parserApiClient = axios.create({
  baseURL: PARSER_API_BASE_URL,
  withCredentials: true,
});

// Auth token handling for `apiClient`
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// (Optional) Add interceptor for parserApiClient if auth is required
parserApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
