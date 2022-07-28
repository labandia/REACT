import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { status } from "./redux/auth";

const ProtectedRoute = ({ children }) => {
   const user = useSelector(status);
   let location = useLocation();
   // let isAuthenticated = JSON.parse(localStorage.getItem("user"));
   return user === true ? (
      children
   ) : (
      <Navigate to="/classroom" state={{ from: location }} />
   );
};

export default ProtectedRoute;
