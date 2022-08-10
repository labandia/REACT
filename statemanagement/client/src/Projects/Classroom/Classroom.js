import { useState, React } from "react";
import logo from "../../images/logo.png";
import Login from "./pages/login";
import Register from "./pages/register";
import "./css/classroom.css";

function Classroom() {
   const [switchpage, setswitchpage] = useState(true);

   const page = () => {
      setswitchpage(!switchpage);
   };

   return (
      <div className="main">
         <div className="front flex-center">
            <img src={logo} className="mb-1" />
            <h1 className="fw-bold fs-850 mb-1">Welcome to GCLAMP</h1>
            <p className="fs-400">
               <strong className="fw-semi-bold">
                  Gordon College Learners Academic Management portal
               </strong>
               provides tools and features to be able to simulate experience and
               activities of face-to-face classes.
            </p>
         </div>
         <div className="mainfront">
            {switchpage ? <Login page={page} /> : <Register page={page} />}
         </div>
      </div>
   );
}

export default Classroom;
