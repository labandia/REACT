import { authHeader } from "../helpers/auth-headers";
import {auth} from '../services/Auth'
import Axios from 'axios';

export const userService = {
        getAll,
        getById
};
    
    
function getAll() {
    let id = auth.isAuthenticated.id;
    return Axios.get(`http://localhost:5000/userinfo/${id}`, {
            headers:{
                "authorization" : authHeader()
            }
    }).then((response)=>{
        return response.data;
    });

}
    
function getById(id) {
    
}