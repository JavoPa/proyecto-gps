import { jwtDecode } from "jwt-decode";

export function putPushToken(token, pushToken){
    if(token != null){
        const decoded = jwtDecode(token);
        id = decoded.id;
        // MANDAR A LA BASE DE DATOS, NECESARIO putUsuario EN BACKEND
    }else{
        return null;
    }
}