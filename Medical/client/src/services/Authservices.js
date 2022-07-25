import Axios from 'axios';

let headertoken = JSON.parse(localStorage.getItem('user'))

export default{
    authenticate: () =>{
        return Axios.get(`http://localhost:5000/isUseraccess`, { 
            headers:{
                "authorization" : `Bearer` + headertoken.token
            }
        }
        ).then(data => data);
    },
    logining: (user) =>{
        console.log(user);
    }
}