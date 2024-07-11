import axios from './root.service';

export async function getJaulas() {
  try {
    const response = await axios.get('/jaulas/');
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
    const response = await axios.post('/jaulas/', data);
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
