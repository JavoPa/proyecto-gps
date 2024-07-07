// AVISO: ESTE ROOT.SERVICE LO CREÉ TEMPORAL PARA PRUEBAS EN WEB - PUEDE QUE NO FUNCIONE EN ANDROID, ESTO LO TIENE QUE VER EL QUE LE TOCA LA PARTE DE AUTENTICACIÓN, 
// QUIZAS SE DEBA UTILIZAR react-native-async-storage PARA QUE FUNCIONE EN ANDROID, O USAR LA DOCUMENTACION DE EXPO.DEV (idk)
import axios from 'axios';
import cookies from 'js-cookie';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt-auth', { path: '/' });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  //TEMPORAL (hice bypass del token para probar, esto hay que quitarlo)
    else{
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJndWFyZGlhQHViYi5jbCIsInJvbGVzIjoiR3VhcmRpYSIsImlkIjoiNjY0YWI5M2VkZDY1ZTExZjNjOGFhZWZiIiwiaWF0IjoxNzIwMzgxNzEzLCJleHAiOjE3MjA0NjgxMTN9.ja6UF-JCkQ3MDDYd2LfF79c5qzfSKag6TxWC4Rac-a0`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
