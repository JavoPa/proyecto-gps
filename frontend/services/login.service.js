import axiosInstance, { setAuthToken } from './root.service';

export async function Login(data) {
    try {
        const res = await axiosInstance.post('/auth/login', data);
        setAuthToken(res.data.data.accessToken); // Configura el token de autorización
        return res.data.data;
    } catch (error) {
        if (error.response.data.message) {
            alert(error.response.data.message);
        }else{
            alert('Ocurrión un error')
        }
        return null;
    }
}