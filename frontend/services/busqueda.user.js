import axiosInstance from './root.service';

// Función para obtener todos los usuarios

export async function obtenerUsuarios(token) {
    try {
        const data = await axiosInstance.get('users/allUsers',{headers: {Authorization: `Bearer ${token}`}});
        if(!data) return null;
        return data;
    } catch (error) {
        console.log('axios',error);
        //incluir manejar errores
    }
}