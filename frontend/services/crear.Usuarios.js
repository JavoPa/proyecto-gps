import { Alert } from 'react-native';
import axiosInstance from './root.service';

export async function CrearUsuario(data) {
    try {
        const res = await axiosInstance.post('/users/crear', data);
        //console.log("await",res);
        return res.data;
    } catch (error) {
        if (error.response) {
            //console.log(error.response.status);
            //console.log(error.response.data.message);
            Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
        }else{
            //console.log(error);
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
            Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
        }else{
            //console.log(error);
        }
    }
}

export async function editarUsuario(id,data) {
    try {
        const res = await axiosInstance.put(`/users/update/${id}`,data);
        //console.log("await",res);
        //console.log(res.data)
        return res.data;
    } catch (error) {
        if (error.response) {
            //console.log(error.response.status);
            //console.log(error.response.data.message);
            Alert.alert(`Error ${error.response.status}`, `${error.response.data.message}`);
        }else{
            //console.log(error);
        }
    }
}