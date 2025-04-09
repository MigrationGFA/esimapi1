// api.ts
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { getAccessToken, setAccessToken, getRefreshToken, removeTokens } from "@/utils/tokenStorage";

// Define API response structure for consistency
export interface ApiResponse<T = any> {
    data: T;
    success: boolean;
    message?: string;
    statusCode: number;
}

// Error type for consistent error handling
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

// Environment configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://162.0.228.134:7005/api/";
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
});

// Setup request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Handle token refresh
const refreshAuthLogic = async (failedRequest: any) => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        
        // Implement your token refresh logic here
        const response = await axios.post(
            `${API_URL}/auth/refresh-token`,
            { refreshToken },
            { withCredentials: true }
        );
        
        const { accessToken } = response.data.data;
        setAccessToken(accessToken);
        
        // Update the failed request with new token
        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
        return Promise.resolve();
    } catch (error) {
        // If refresh fails, log out the user
        removeTokens();
        return Promise.reject(error);
    }
};

// Setup response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Standardize successful responses to match our ApiResponse interface
        return {
            ...response,
            data: {
                data: response.data?.data || response.data,
                success: true,
                statusCode: response.status,
                message: response.data?.message || response.statusText
            }
        };
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // Handle token expiration and refresh
        if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            
            try {
                await refreshAuthLogic(error);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                removeTokens();
                // Optionally redirect to login page
                if (typeof window !== 'undefined') {
                    // window.location.href = '/login';
                }
            }
        }

        // Create standardized error response
        const errorData = error.response?.data as any;
        const errorResponse: ApiError = {
            message: errorData?.message || errorData?.detail || error.message || 'Unknown error occurred',
            statusCode: error.response?.status || 500,
            errors: errorData?.errors
        };

        return Promise.reject(errorResponse);
    }
);

// Generic request function with typing
export async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Helper functions for common HTTP verbs
export async function get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return request<T>({ method: 'GET', url, params });
}

export async function post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return request<T>({ method: 'POST', url, data });
}

export async function put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return request<T>({ method: 'PUT', url, data });
}

export async function patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return request<T>({ method: 'PATCH', url, data });
}

export async function del<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return request<T>({ method: 'DELETE', url, params });
}

// Export a bundled API object for convenience
const api = {
    get,
    post,
    put,
    patch,
    delete: del,
    request
};

export default api;