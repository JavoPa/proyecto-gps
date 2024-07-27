import { Alert } from 'react-native';
import axiosInstance from './root.service';


export default async function validarRut (rut) {
    try {
        const validar = await axiosInstance.post('/users/obtener' , {rut: rut},{timeout: 50000});
        console.log(validar.data);
        if(!validar.data){
            Alert.alert('Error', 'Sin datos');
            return null;
        }
        return validar.data;
    } catch (error) {
        console.log(error);
        if(error){
            Alert.alert('Error de conexión', '(805) Error de conexión al servidor');
            return null;
        }
        if(error.response.status === 404){
            Alert.alert('Usuario no encontrado', '(804) Usuario no encontrado');
            return null;
        }
        if(error.response.status === 400){
            Alert.alert('Problemas el RUT', '(803) Verifique que el RUT sea correcto');
            return null;
        }
        
    }
}



export function validarCorreo(correo) {
    console.log(correo);
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
}