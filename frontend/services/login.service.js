import axiosInstance, { setAuthToken } from './root.service';

export async function Login(data) {
    try {
        const res = await axiosInstance.post('/auth/login', data);
        console.log(res);
        setAuthToken(res.data.data.accessToken); // Configura el token de autorización
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Ocurrió un error de conexión');
        }
        return null;
    }
}