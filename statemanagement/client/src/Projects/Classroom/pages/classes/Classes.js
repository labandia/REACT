import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { currentuser } from "../../redux/auth";
import { selectedclass } from "../classes/ClassSelectSlice";
import logo from "../../../../images/logo.png";
import "../../css/header.css";

function Classes() {
   const axiosprivate = useAxiosPrivate();

   const users = useSelector(currentuser);
   const dispatch = useDispatch();
   const location = useNavigate();
   const [classes, setclasses] = useState([]);

   const selectclass = (data) => {
      dispatch(selectedclass(data));
      location(`${data.classcode_fld}`);
   };

   useEffect(() => {
      let ismounted = true;
      const controller = new AbortController();

      const getclasses = async (id) => {
         try {
            const result = await axiosprivate.get(`getclasses/${id}`, {
               signal: controller.abort(),
            });

            if (result.data.success === true) {
               ismounted && setclasses(result.data.payload);
            }
         } catch (error) {
            console.log(error);
            location("/classroom");
         }
      };

      getclasses(users.id);

      return () => {
         ismounted = false;
         controller.abort();
      };
   }, [users, location, axiosprivate]);

   return (
      <div>
         <section className="student">
            <div className="container flex-space">
               <div className="student__fullname txt-white">
                  <h1 className="fw-semi-bold">Good morning, {users.name}</h1>
                  <span className="fs-400">{users.email}</span>
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
               <div className="classesheader flex-space">
                  <div className="flex-align2">
                     <i className="bx bx-slideshow headericon"></i>
                     <h1 className="fw-semi-bold fs-800">My Classes</h1>
                  </div>
                  <select>
                     <option value="">Today</option>
                     <option value="">All</option>
                  </select>
               </div>

               <div className="classesgrid col-3">
                  {classes.map((stud, index) => {
                     return (
                        <div
                           className="classecard"
                           key={index}
                           onClick={() => selectclass(stud)}
                        >
                           <div className="flex-align">
                              <img src={logo} alt="" />
                              <p className="fs-500 fw-semi-bold">
                                 {stud.fname_fld} {stud.lname_fld}
                              </p>
                           </div>

                           <h2 className="fw-bold fs-600">
                              {stud.subjdesc_fld}
                           </h2>

                           <div className="classesinfo col-3">
                              <div className="classcol">
                                 <small className="fs-300">Classcode</small>
                                 <p className="fw-semi-bold fs-400">
                                    {stud.classcode_fld}
                                 </p>
                              </div>

                              <div className="classcol">
                                 <small className="fs-300">Block</small>
                                 <p className="fw-semi-bold fs-400">
                                    {stud.block_fld}
                                 </p>
                              </div>

                              <div className="classcol">
                                 <small className="fs-300">Time </small>
                                 <p className="fw-semi-bold fs-400">
                                    {stud.starttime_fld}-{stud.endtime_fld}
                                 </p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </main>
      </div>
   );
}

export default Classes;
