import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Crear instancia de axios con configuración base para la API de futbol
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores durante las respuestas de la API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;