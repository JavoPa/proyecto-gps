import axios from './root.service';

export async function getJaulas() {
  try {
    const response = await axios.get('/jaulas');
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function postJaula(data) {
  try {
    const response = await axios.post('/jaulas', data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function deleteJaula(id) {
  try {
    const response = await axios.delete(`/jaulas/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function getJaulaById(id) {
  try {
    const response = await axios.get(`/jaulas/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function updateJaula(id, data) {
  try {
    const response = await axios.put(`/jaulas/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function asignarGuardia(jaulaId) {
  try {
    const response = await axios.post('/guardias/accesoGuardia', { jaulaId });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function salirGuardia(jaulaId) {
  try {
    const response = await axios.post('/guardias/salidaGuardia', { jaulaId });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}

export async function getJaulaAsignada() {
  try {
    const response = await axios.get('/guardias/jaulaAsignada');
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}
export async function salidaGuardiaAdmin(jaulaId) {
  try {
    const response = await axios.post('/jaulas/salidaGuardia', { jaulaId });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Ocurrió un error en la api' };
    }
  }
}
