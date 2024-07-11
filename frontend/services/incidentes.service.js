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

export async function getIncidentesDia(fecha) {
  try {
    const response = await axios.get(`/incidentes/dia?fecha=${fecha}`);
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

export async function getIncidentesInforme(year, month) {
  try {
    const response = await axios.get(`/incidentes/informe?year=${year}&month=${month}`);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function createIncidente(fecha, hora, lugar, tipo, descripcion) {
  try {
    const response = await axios.post('/incidentes/crear', { fecha, hora, lugar, tipo, descripcion });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return { message: 'Ocurrió un error en la api' }
    }
  }
}