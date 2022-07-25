import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/auth";
import axios from "axios";

const URL = "http://localhost:4000/users/login";

function Login({ page }) {
   // const userRef = useRef();
   const errRef = useRef(null);
   const dispatch = useDispatch();
   const users = useSelector((state) => state.auth.token);

   const [username, setuser] = useState("");
   const [password, setpwd] = useState("");
   const [isloading, setisloading] = useState(false);
   const [errMsg, seterrMsg] = useState("");

   const handlesubmit = async (e) => {
      e.preventDefault();
      setisloading(true);

      try {
         let res = await axios.post(
            URL,
            JSON.stringify({ username, password }),
            {
               headers: { "Content-type": "application/json" },
               // withCredentials: true,
            }
         );
         if (res?.data.success === true) {
            dispatch(
               setCredentials({
                  user: res.data.user,
                  token: res.data.token,
               })
            );
            setisloading(false);
            setuser("");
            setpwd("");
         }
      } catch (err) {
         console.log(err);
         if (!err.response) {
            seterrMsg("No Server Response");
         } else if (err.response.status === 500) {
            seterrMsg("Login failed");
         } else {
            seterrMsg("Login failed");
         }
         setisloading(false);
      }
   };

   useEffect(() => {}, [dispatch]);

   // useEffect(() => {
   //    userRef.current.focus();
   // }, []);

   // useEffect(() => {
   //    errRef.current.focus();

   // }, [user, pwd]);

   return (
      <div className="login">
         <div className="errmessage flex-align">
            <i className="bx bxs-error-circle"></i>
            <p>{errMsg}</p>
         </div>
         <h1>Login your credentials</h1>
         <form onSubmit={handlesubmit} className="form">
            <div className="formgroup">
               <label htmlFor="username">Domain Email:</label>
               <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  className="formscontrol"
                  onChange={(e) => setuser(e.target.value)}
                  value={username}
                  required
               />
            </div>

            <div className="formgroup">
               <label htmlFor="Password">Password:</label>
               <input
                  type="password"
                  id="Password"
                  autoComplete="off"
                  className="formscontrol"
                  onChange={(e) => setpwd(e.target.value)}
                  value={password}
                  required
               />
            </div>

            <div className="formsaction">
               <button>
                  {isloading ? (
                     <span>
                        <i className="bx bx-loader-circle bx-spin bx-rotate-90"></i>
                        Loading...
                     </span>
                  ) : (
                     <span>Sign in</span>
                  )}
               </button>

               <span>
                  Forget password? <b onClick={page}>click here</b>
               </span>
            </div>
         </form>
      </div>
   );
}

export default Login;
