import axios from './root.service';

export async function getUsuariosConBicicleta() {
    try {
        const response = await axios.get('/guardias/usuariosbicicletas');
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}

export async function getUsuarioById(id) {
    try {
        const response = await axios.get(`/guardias/usuario/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la api' };
        }
    }
}
