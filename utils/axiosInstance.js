// utils/axiosInstance.js
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: false, // optional, if you're using cookies/session
});

export default axiosInstance;
