import { getAccessToken, removeAccessToken } from "@/utils/tokenStorage";
import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  code?: string;
}

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
    //console.log("taken being sent:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Response Interceptor (global error handling)
api.interceptors.response.use(
  (response) => {
    return response.data; // ✅ clean success response
  },

  // ✅ Extract backend message safely
  async (error: AxiosError<ApiErrorResponse>) => {
    //Your fallback logic can hide the real backend message
    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const url = error.config?.url;

    console.log(
      `API Error: ${message} (Status: ${status}, URL: ${url}) code: ${code}`,
    );
    // ✅ Skip login API
    // if (url?.includes("/login")) {
    //   return Promise.reject(error);
    // }

    //handle invalid/expired tokens from backend
    if (code === "TOKEN_EXPIRED") {
      // Token expired or invalid

      removeAccessToken();
      window.location.href = "/sign-in?reason=session_expired"; // redirect to login
    }

    return Promise.reject({ message, status });
  },
);

export default api;
