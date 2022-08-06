import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Members = ({ open, classcode, ay_fld, sem_fld }) => {
   const [studentdata, setstudentdata] = useState([]);
   const [teacherdata, setteacherdata] = useState([]);

   useEffect(() => {
      let ismouted = true;
      const controller = new AbortController();

      const membersdata = async () => {
         try {
            let res = await axios.post("getmembers", {
               classcode: classcode,
               ay: ay_fld,
               sem: sem_fld,
            });
            if (res.data.success === true) {
               ismouted && setstudentdata(res.data.students);
               ismouted && setteacherdata(res.data.teachers);
               //  ismouted && setdata(res.data.payload);
            }
         } catch (error) {
            console.log(error);
         }
      };

      membersdata();

      return () => {
         ismouted = false;
         controller.abort();
      };
   }, [classcode, ay_fld, sem_fld]);

   const teacherender = teacherdata.map((data, index) => {
      return (
         <div onClick={open} className="memberscard flex-align" key={index}>
            <div className="memberimg">
               <img
                  src={
                     "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk"
                  }
                  alt=""
               />
            </div>
            <div className="fullnamemem">
               <p className="fw-semi-bold fs-500">
                  {data.fname_fld}
                  {data.lname_fld}
               </p>
               <small className="fs-300">{data.email_fld}</small>
            </div>
         </div>
      );
   });

   const studentender = studentdata.map((data, index) => {
      return (
         <div onClick={open} className="memberscard flex-align" key={index}>
            <div className="memberimg">
               <img
                  src={
                     "https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk"
                  }
                  alt=""
               />
            </div>
            <div className="fullnamemem">
               <p className="fw-semi-bold  fs-500">
                  {data.fname_fld}
                  {data.lname_fld}
               </p>
               <small className="fs-300">{data.email_fld}</small>
            </div>
         </div>
      );
   });

   return (
      <div className="member">
         <h2 className="fw-bold">Members</h2>
         {teacherender}
         {studentender}
      </div>
   );
};

export default Members;
