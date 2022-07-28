import { useSelector } from "react-redux";
import { currentuser } from "../redux/auth";
import "../css/header.css";

function Classes() {
   const users = useSelector(currentuser);
   return (
      <div>
         <section className="student">
            <div className="container flex-space">
               <div className="student__fullname txt-white">
                  <h1 className="fw-semi-bold">Good morning, {users.name}</h1>
                  <span className="fs-400">202010345@gordoncollege.edu.ph</span>
               </div>
               <div className="student__status even-columns">
                  <div className="student__achieve flex-align">
                     <div className="student__icon">
                        <i className="bx bxs-star"></i>
                     </div>
                     <div className="student__nums txt-white">
                        <h3 className="fw-semi-bold fs-600">4/10</h3>
                        <span className="fw-light fs-300">Skill earned</span>
                     </div>
                  </div>

                  <div className="student__achieve flex-align">
                     <div className="student__icon">
                        <i className="bx bxl-dribbble"></i>
                     </div>
                     <div className="student__nums txt-white">
                        <h3 className="fw-semi-bold fs-600">23</h3>
                        <span className="fw-light fs-300">Badge earned</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <main>
            <div className="container">
               <h1 className="fw-semi-bold fs-800">Classes</h1>
            </div>
         </main>
      </div>
   );
}

export default Classes;
