import { getAccessToken } from "@/utils/tokenStorage";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: apiUrl,
  //timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (for token later)
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
// ✅ Response Interceptor (global error handling)
api.interceptors.response.use((response) => {
  return response.data;
});

export default api;
