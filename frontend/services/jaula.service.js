import axios from './root.service';

const BASE_URL = 'http://localhost:5000/api/jaulas/';

export async function getJaulas() {
    try {
        const response = await axios.get(BASE_URL);
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
        const response = await axios.post(BASE_URL, data);
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
        const response = await axios.delete(`${BASE_URL}${id}`);
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
        const response = await axios.get(`${BASE_URL}${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}
