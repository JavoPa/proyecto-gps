import axios from 'axios'
import API_URL from '../constants/constantes';

export async function Login(data) {
    try {
        const res = await axios.post(API_URL, data );
        return res.data.data;
    } catch (error) {
        //alert('Error al iniciar sesión, vulva a intentarlo');
        console.log(error);
        return null;
    }
}