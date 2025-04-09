// api.ts
import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/utils/tokenStorage";
import https from "https"; // Import https module



const API_URL = "http://162.0.228.134:7005/api/"
const DEFAULT_TIMEOUT = 30000; // 30 seconds

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json", // Set default headers
    },
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    // httpsAgg
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, //  Bypass SSL validation
    }),
});


// Request interceptor to add token to headers
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // return Promise.reject(error);
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);


// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeAccessToken();
        }
        return Promise.reject(error);
    }
);


export default api