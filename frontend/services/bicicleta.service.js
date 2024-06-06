import axios from './root.service';

export async function getBicicleta() {
    try {
        const response = await axios.get('/users/bicicleta');
        return response;
      } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            return error.response;
          } else {
            return { message: 'Ocurrió un error en la api' };
          }
      }
  }
export async function postBicicleta(data) {
    try {
        const response = await axios.post('/users/bicicleta', data);
        return response.data;
      } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            return error.response.data;
          } else {
            return { message: 'Ocurrió un error en la api' };
          }
      }
  }
  export async function putBicicleta(data) {
    try {
        const response = await axios.put('/users/bicicleta', data);
        return response.data;
      } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            return error.response.data;
          } else {
            return { message: 'Ocurrió un error en la api' };
          }
      }
  }
  export async function updateBicicletaUsuario(userId, data) {
    try {
        const response = await axios.post(`/guardias/bicicleta/${userId}`, data);
        return response.data;
      } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            return error.response.data;
          } else {
            return { message: 'Ocurrió un error en la api' };
          }
      }
  }