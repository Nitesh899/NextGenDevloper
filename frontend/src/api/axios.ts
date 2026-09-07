import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { authStorage } from "../services/authStorage";
import {
  notifyAuthLogout,
} from "../services/authEvents";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

interface RetryableRequest
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (
  error: unknown,
  token: string | null
) => {
  failedQueue.forEach(
    ({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else if (token) {
        resolve(token);
      }
    }
  );

  failedQueue = [];
};

/*
 * Add access token automatically.
 */
api.interceptors.request.use(
  (config) => {
    const accessToken =
      authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  }
);

/*
 * Handle 401 responses.
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | RetryableRequest
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /*
     * Never refresh the refresh endpoint itself.
     */
    if (
      originalRequest.url?.includes(
        "/auth/token/refresh/"
      )
    ) {
      authStorage.clearTokens();
      notifyAuthLogout();

      return Promise.reject(error);
    }

    /*
     * Another request is already refreshing.
     */
    if (isRefreshing) {
      return new Promise<string>(
        (resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }
      ).then((newAccessToken) => {
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken =
      authStorage.getRefreshToken();

    if (!refreshToken) {
      isRefreshing = false;

      authStorage.clearTokens();
      notifyAuthLogout();

      return Promise.reject(error);
    }

    try {
      const response =
        await axios.post<{
          success: boolean;
          message: string;
          access: string;
          refresh?: string;
        }>(
          `${API_BASE_URL}/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

      const newAccessToken =
        response.data.access;

      const newRefreshToken =
        response.data.refresh;

      if (newRefreshToken) {
        authStorage.setTokens(
          newAccessToken,
          newRefreshToken
        );
      } else {
        authStorage.updateAccessToken(
          newAccessToken
        );
      }

      processQueue(
        null,
        newAccessToken
      );

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch (refreshError) {
      processQueue(
        refreshError,
        null
      );

      authStorage.clearTokens();
      notifyAuthLogout();

      return Promise.reject(
        refreshError
      );

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;