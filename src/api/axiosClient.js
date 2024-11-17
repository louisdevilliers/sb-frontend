import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000", // Set your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

/*
axiosClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
