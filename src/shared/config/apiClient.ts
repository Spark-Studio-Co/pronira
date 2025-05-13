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

// --- Request interceptors: Add token to headers ---
const addAuthHeader = (config: any) => {
  const token = localStorage.getItem("admin_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

apiClient.interceptors.request.use(addAuthHeader);
parserApiClient.interceptors.request.use(addAuthHeader);

// --- Response interceptor: Handle 401 Unauthorized ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("auth-storage");
    }

    return Promise.reject(error);
  }
);
