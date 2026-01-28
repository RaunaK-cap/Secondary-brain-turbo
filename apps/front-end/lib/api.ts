import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Backend middleware supports raw token and "Bearer <token>"
      config.headers = config.headers ?? {};
      config.headers.authorization = `Bearer ${token}`;
    }
  }
  return config;
});

