import axios from './root.service';

export async function getAllIncidentes() {
  try {
    const response = await axios.get('/incidentes/todos');
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

export async function getIncidentesInforme() {
  try {
    const response = await axios.get('/incidentes/informe');
    return response;
  } catch (error) {
    if (error.response) {
      return error.response
    } else {
      return { message: 'Ocurrió un error en la api' }
    }
  }
}