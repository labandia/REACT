import { Navigate, useLocation } from 'react-router-dom';




const ProtectedRoute = ({children}) =>{
  let location = useLocation();
  let isAuthenticated = JSON.parse(localStorage.getItem('user'));
  return isAuthenticated.success === true  ? 
  children : 
  <Navigate to="/" state={{ from: location }} />
}


export default ProtectedRoute