import { useState } from "react";
import { useSelector } from "react-redux";
import { activitydata } from "./ClassSelectSlice";
import { useNavigate } from "react-router-dom";
import { splitFilestring, getFileExtension } from "./postservice";
import "../../css/viewactivity.css";

function ViewActivity() {
   const location = useNavigate();
   const [files, setfiles] = useState([]);
   const actdata = useSelector(activitydata);

   const studentfile = () => {
      let array = [];
      array = splitFilestring(actdata.filedir_fld);

      return array;
   };

   console.log(actdata);

   return (
      <div className="viewactivity container col-2">
         <div className="viewcontent">
            <button
               onClick={() => {
                  location(-1);
               }}
               className="viewcontentback"
            >
               <i className="bx bx-arrow-back"></i>
            </button>
            <div className="viewcontent-header flex-space">
               <div className="viewcontent-title">
                  <h1>{actdata.title_fld}</h1>
                  <span className="fs-400">
                     <b>Date:</b>
                     {actdata.datetime_fld} - {actdata.deadline_fld}
                  </span>
               </div>
               <div className="viewcontent-teacher flex-align">
                  <div className="viewcontent-img">
                     <img
                        src={
                           "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc"
                        }
                        alt=""
                     />
                  </div>
                  <p className="fw-semi-bold">Name teacher</p>
               </div>
            </div>

            <p className="viewcontent-details">{actdata.desc_fld}</p>
            <hr />
            <strong>Attachments</strong>
            <div className="viewcontent-attach">
               <div className="viewcontent-box">
                  <i className="bx bxs-file"></i>
                  <p>File name</p>
               </div>
            </div>
         </div>

         <div className="studentworks">
            <div className="studentstatus">
               <div className="studentheader flex-space">
                  <h2 className="fs-700">Works</h2>
                  <span>Late</span>
               </div>
               {studentfile().map((stud, index) => {
                  return (
                     <div className="studentsfile flex-space" key={index}>
                        <div className="studentsfiledetails flex-align">
                           <i
                              className={`bx ${getFileExtension(stud.name)}`}
                           ></i>
                           <div className="studentsfilename">
                              <p className="fw-semi-bold fs-500">{stud.name}</p>
                              <small></small>
                           </div>
                        </div>
                        <i className="bx bx-x-circle"></i>
                     </div>
                  );
               })}

               <button>Submit assign</button>
            </div>
         </div>
      </div>
   );
}

export default ViewActivity;
