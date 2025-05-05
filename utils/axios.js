import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090', // Spring Boot backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
