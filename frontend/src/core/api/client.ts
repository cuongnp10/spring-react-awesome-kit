import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth-store";
import { ApiResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & Auth Expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      useAuthStore.getState().logout();
    } else if (error.response?.status === 403) {
      toast.error("Access forbidden. You do not have permission.");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message === "Network Error") {
      // Don't spam toasts if using fallback mock mode
      console.warn("Backend server not reachable at " + BASE_URL);
    } else {
      toast.error(error.message || "An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
