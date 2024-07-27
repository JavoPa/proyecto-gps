import { Alert } from 'react-native';
import {API_URL2} from './root.service';
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
        if (error.response) {
            Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
        }else{
            //Alert.alert('Error', 'Sin conexión');
        }
        
    }
}



export function validarCorreo(correo) {
    console.log(correo);
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
}