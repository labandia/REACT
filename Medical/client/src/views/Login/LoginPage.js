import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../services/AuthContext";
import Cookies from "js-cookie";
import registerpic from "../../images/register.png";
import logo from "../../images/Logo.png";
import Button from "@mui/material/Button";
import "./Login.css";

const initialstate = {
   username: "",
   password: "",
   suserError: "",
   spassError: "",
};

function LoginPage() {
   const [state, setstate] = useState(initialstate);
   const [useerrpr, setuseerrpr] = useState("");
   const [passworde, setpassworder] = useState("");

   const { setisaccess } = useContext(LoginContext);

   // Axios.defaults.withCredentials = true;

   let history = useNavigate();

   let validate = () => {
      let userError = "";
      let passError = "";

      if (!state.username.trim()) {
         userError = "Username is required";
         setuseerrpr(userError);
      }

      if (!state.password.trim()) {
         passError = "Password is required";
         setpassworder(passError);
         return false;
      }

      return true;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const isvalid = validate();

      if (isvalid) {
         try {
            Axios.post("http://localhost:5000/login", state).then(
               (response) => {
                  if (response.data.success === true) {
                     localStorage.setItem(
                        "user",
                        JSON.stringify(response.data)
                     );
                     setisaccess(response.data.success);
                     Cookies.set("users", JSON.stringify(response.data));
                     history("/admin/dash");
                     // history("/admin/medicine");
                  }
               }
            );
         } catch (error) {
            console.log("Username and password is incorrect");
         }

         setuseerrpr("");
         setpassworder("");
         setstate(initialstate);
      }
   };

   const handlechange = (e) => {
      const { name, value } = e.target;
      setstate({
         ...state,
         [name]: value,
      });
   };

   return (
      <div className="main">
         <div className="login">
            <form onSubmit={handleSubmit} className="loginwrap">
               <img src={logo} alt={"Logo"}></img>
               <h1>Login</h1>
               <p>Login your credentials</p>
               <div className="labels">
                  <label>Username</label>
                  {useerrpr && <span className="error">{useerrpr}</span>}
               </div>
               <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handlechange}
               />

               <div className="labels">
                  <label>Password</label>
                  {passworde && <span className="error">{passworde}</span>}
               </div>
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlechange}
               />

               <Button
                  variant="contained"
                  style={{ fontSize: ".8rem", textTransform: "capitalize" }}
                  type="submit"
               >
                  Login
               </Button>
               <p
                  style={{
                     fontWeight: "500",
                     color: "#222",
                     textAlign: "center",
                  }}
               >
                  Forget password ?{" "}
                  <span className="clickhere">Click here</span>{" "}
               </p>
            </form>
         </div>
         <div className="imagecontainer">
            <img src={registerpic} alt={"register"}></img>
            <h2>Pharmacy Management System</h2>
         </div>
      </div>
   );
}

export default LoginPage;
