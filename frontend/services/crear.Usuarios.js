import { Alert } from 'react-native';
import axiosInstance from './root.service';
import { Platform } from 'react-native';

export async function CrearUsuario(data) {
    try {
        console.log(data);
        const res = await axiosInstance.post('/users/crear', data);
        //console.log("await",res);
        return res.data;
    } catch (error) {
        if (error.response) {
            //console.log(error.response.status);
            //console.log(error.response.data.message);
            if (Platform.OS === 'web') {
                alert(`Error ${error.response.data.message}`);
            } else {
                Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
            }
        }else{
            if (Platform.OS === 'web') {
                alert('Error de conexión');
            } else {
                Alert.alert('Error de conexión');
            }
            return null;
        }
    }
}

export async function eliminarUsuario(data) {
    try {
        const res = await axiosInstance.delete(`/users/delete/${data}`);
        //console.log("await",res);
        //console.log(res.data)
        return res.data;
    } catch (error) {
        if (error.response) {
            //console.log(error.response.status);
            //console.log(error.response.data.message);
            if (Platform.OS === 'web') {
                alert(`Error ${error.response.data.message}`);
            } else {
                Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
            }
            return undefined;
        }else{
            if (Platform.OS === 'web') {
                alert('Error de conexión');
            } else {
                Alert.alert('Error de conexión');
            }
            return null;
        }
    }
}

export async function editarUsuario(id,data) {
    try {
        //console.log(id,data)
        const res = await axiosInstance.put(`/users/update/${id}`,data);
        //console.log("await",res);
        //console.log(res.data)
        return res.data;
    } catch (error) {
        if (error.response) {
            //console.log(error.response.status);
            //console.log(error.response.data.message);
            if (Platform.OS === 'web') {
                alert(`Error ${error.response.data.message}`);
            } else {
                Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
            }
        }else{
            if (Platform.OS === 'web') {
                alert('Error de conexión');
            } else {
                Alert.alert('Error de conexión');
            }
            return null;
        }
    }
}