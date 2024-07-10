import axios from './root.service';

export async function getGuardias() {
    try {
        const response = await axios.get('/Admin/guardias/');
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}

export async function postGuardia(data) {
    try {
        const response = await axios.post('/Admin/guardias/', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}

export async function deleteGuardia(id){
    try {
        const response = await axios.delete(`/Admin/guardias/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}

export async function getGuardiaById(id) {
    try {
        const response = await axios.get(`/Admin/guardias/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}
