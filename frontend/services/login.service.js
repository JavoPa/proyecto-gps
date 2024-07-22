import axiosInstance, { setAuthToken } from './root.service';

export async function Login(data) {
    try {
        const res = await axiosInstance.post('/auth/login', data);
        setAuthToken(res.data.data.accessToken); // Configura el token de autorización
        return res.data.data;
    } catch (error) {
        //alert('Error al iniciar sesión, vulva a intentarlo');
        console.log(error.response);
        return null;
    }
}