import axios from 'axios';
import { fetchAuthSession } from "aws-amplify/auth";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const idToken = session?.tokens?.idToken;

      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      }
    } catch (error) {
      console.error("Error fetching auth session:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
