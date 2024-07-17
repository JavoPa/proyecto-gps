import axios from 'axios';
import { Alert } from 'react-native';


export default async function validarRut (rut) {
    try {
        const validar = await axios.post('http://192.168.1.3:5000/api/users/obtener' , {rut: rut});
        if(!validar.data){
            return null;
        }
        return validar.data;
    } catch (error) {
        console.log(error.response.status);
        if(error.response.status === 404){
            return null;
        }
        if(error.response.status === 400){
            Alert.alert('Problemas el RUT', 'Verifique que el RUT sea correcto');
        }
    }
}