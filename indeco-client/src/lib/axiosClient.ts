/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from "@/constants/common";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// ======== Biến toàn cục ========
let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}[] = [];

// ======== Hàm xử lý queue ========
const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) prom.resolve(token);
        else prom.reject(error!);
    });
    failedQueue = [];
};

// ======== Hàm decode JWT ========
const parseJwt = (token: string): any => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

// ======== Hàm refresh token ========
const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await axios.post<Result<{ accessToken: string }>>(
            `${process.env.NEXT_PUBLIC_API_URL}customer/refresh-token`,
            {},
            { withCredentials: true }
        );
        const newToken = response.data.data?.accessToken;
        if (newToken) {
            localStorage.setItem("accessToken", newToken);
            axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        }
        return newToken || null;
    } catch (error) {
        return null;
    }
};

// ======== Axios instance ========
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    timeout: 50000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// ======== Request Interceptor ========
axiosClient.interceptors.request.use(
    async (config) => {
        const requiresAuth = (config as AxiosRequestConfig & { requiresAuth?: boolean }).requiresAuth;
        if (!requiresAuth) return config;

        if (typeof window === "undefined") return config;

        const token = localStorage.getItem("accessToken");
        if (!token) return config;

        // Check token expiration
        const payload = parseJwt(token);
        const now = Date.now() / 1000;
        if (payload?.exp && now >= payload.exp - 60) { // refresh trước 60s
            if (isRefreshing) {
                // Nếu đang refresh, đợi token mới
                const newToken = await new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
                config.headers.Authorization = `Bearer ${newToken}`;
                return config;
            }

            isRefreshing = true;
            const newToken = await refreshAccessToken();
            isRefreshing = false;

            if (newToken) {
                processQueue(null, newToken);
                config.headers.Authorization = `Bearer ${newToken}`;
            } else {
                processQueue(new AxiosError("Refresh token failed"), null);
            }
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ======== Response Interceptor (fallback khi vẫn bị 401) ========
axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return axiosClient(originalRequest);
                });
            }

            isRefreshing = true;
            const newToken = await refreshAccessToken();
            isRefreshing = false;

            if (newToken) {
                processQueue(null, newToken);
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                return axiosClient(originalRequest);
            } else {
                processQueue(error, null);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
