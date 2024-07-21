import axios from './root.service';

export async function getHistorialUsuario() {
    try {
        const response = await axios.get('/users/historial'); // Ajusta la URL según tu configuración del backend
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return { message: 'Ocurrió un error en la API' };
        }
    }
}