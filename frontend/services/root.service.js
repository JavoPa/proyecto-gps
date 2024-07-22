import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.3:4000/api';

// Crea una instancia de Axios con configuraciones por defecto
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Función para actualizar el token de autorización
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //localStorage.setItem('authToken', token);
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;