import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://146.83.198.35:1264/api';
export const API_URL2 = process.env.EXPO_PUBLIC_API_URL_I;

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

