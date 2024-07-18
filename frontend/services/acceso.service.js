import axios from './root.service';

export async function registrarIngreso() {
    try {
        const response = await axios.post('/users/acceder');
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

  export async function getAcceso() {
    try {
        const response = await axios.get('/users/accesoActivo');
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

  export async function validar(token) {
    try {
        const response = await axios.post(`/guardias/validar/${token}`);
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

  export async function registrarSalida() {
    try {
        const response = await axios.put('/users/salir');
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

  export async function ingresoInvitado(data) {
    try {
        const response = await axios.post('/guardias/accesoInvitado', data);
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