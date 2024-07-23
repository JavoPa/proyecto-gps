import axiosInstance, { setAuthToken } from "./root.service";
import { jwtDecode } from "jwt-decode";

export async function putPushToken(token, pushToken){
    if(token !== null){
        try{
            setAuthToken(token);
            const decoded = jwtDecode(token);
            id = decoded.id;
            console.log("decoded: ", decoded);
            await axiosInstance.put("/pushToken/update", {id, pushToken});

            console.log("PushToken actualizado");
        }catch(error){
            console.error("Error al actualizar el pushToken", error);
        }
    }else{
        console.error("No se ha proporcionado un token");
        return null;
    }
}

export async function clearPushToken(token){
    if(token !== null){
        try{
            setAuthToken(token);
            const decoded = jwtDecode(token);
            id = decoded.id;
            console.log("decoded: ", decoded);
            await axiosInstance.put("/pushToken/clear", {id});

            console.log("PushToken eliminado");
        }catch(error){
            console.error("Error al eliminar el pushToken", error);
        }
    }else{
        console.error("No se ha proporcionado un token");
        return null;
    }
}