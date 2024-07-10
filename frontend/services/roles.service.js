import { jwtDecode } from "jwt-decode";

export function rolesService(token) {

    if(token != null){
        const decoded = jwtDecode(token);
        return decoded.roles;
    }else{
        return null;
    }
}