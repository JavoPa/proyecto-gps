import { Alert } from 'react-native';
const API_URL2 = process.env.EXPO_PUBLIC_API_URL_I || 'http://38.7.199.239:5000/api';
import axios from 'axios';



export default async function validarRut (rut) {
    try {
        //console.log(axiosInstance2.baseURL);
        const validar = await axios.post(`${API_URL2}/users/obtener` , {rut: rut},{timeout: 10000});
        console.log(validar.data);
        if(!validar.data){
            Alert.alert('Error', 'Sin datos');
            return null;
        }
        return validar.data;
    } catch (error) {
        console.log(error);
        //android
        if (error.response) {
            Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
        }else{
            //Alert.alert('Error', 'Sin conexión');
        }
        //web
        if(error){
            alert('Usuario sin registros en intranet, registrelo manual');
        }
        
    }
}



export function validarCorreo(correo) {
    console.log(correo);
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
}