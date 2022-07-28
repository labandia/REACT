import { useState, React } from "react";
import logo from "../../images/logo.png";
import Login from "./pages/login";
import Register from "./pages/register";
import "./css/main.css";

function Classroom() {
   const [switchpage, setswitchpage] = useState(true);

   const page = () => {
      setswitchpage(!switchpage);
   };

   return (
      <div className="col-2 main">
         <div className="front flex-center">
            <img src={logo} />
            <h1>Welcome to GCLAMP</h1>
            <p>
               <strong>
                  Gordon College Learners Academic Management portal
               </strong>
               provides tools and features to be able to simulate experience and
               activities of face-to-face classes.
            </p>
         </div>
         {switchpage ? <Login page={page} /> : <Register page={page} />}
      </div>
   );
}

export default Classroom;
