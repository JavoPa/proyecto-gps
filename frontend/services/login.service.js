import axios from 'axios'
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function Login(data) {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data );
        return res.data.data;
    } catch (error) {
        //alert('Error al iniciar sesión, vulva a intentarlo');
        console.log(error);
        return null;
    }
}