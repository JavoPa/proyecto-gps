import axios from 'axios';
import { Alert } from 'react-native';


export default async function validarRut (rut) {
    try {
        const validar = await axios.post(process.env.EXPO_BACKEND_RUT , { rut: rut });
        if(!validar){
            return null;
        }
        return validar;
    } catch (error) {
         Alert.alert('Error', 'Error al validar rut');
    }
}