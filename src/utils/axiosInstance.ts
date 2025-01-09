import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(API_BASE_URL)
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

let isRefreshing = false; // Track refresh state
let refreshSubscribers: Array<(token: string) => void> = []; // To queue requests during refresh

// Helper to handle queued requests
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Interceptor for responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.get(`${API_BASE_URL}/admins-auth/refresh-token`, { withCredentials: true });
          isRefreshing = false;
        
          // Notify queued requests
          const newAccessToken = response.data.data.accessToken; // Ensure your API returns this
          onTokenRefreshed(newAccessToken);
          return axiosInstance(originalRequest); // Retry original request
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // Queue requests during refresh
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
