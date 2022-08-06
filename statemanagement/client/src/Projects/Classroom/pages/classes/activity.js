import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { currentuser } from "../../redux/auth";

const Activity = ({ code }) => {
   const users = useSelector(currentuser);
   const [act, setact] = useState([]);

   useEffect(() => {
      let ismouted = true;
      const controller = new AbortController();

      const monthNames = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "July",
         "Aug",
         "Sept",
         "Oct",
         "Nov",
         "Dec",
      ];

      const activitydata = async () => {
         try {
            let res = await axios.post("getactivity", {
               studnum_fld: users.id,
               classcode_fld: code,
            });
            if (res.data.success === true) {
               let temparray = res.data.payload;
               temparray.map((el) => {
                  var d = new Date(el.deadline_fld);
                  el.deadline_fld =
                     monthNames[d.getMonth()] + " " + d.getDay().toString();
                  return el;
               });
               ismouted && setact(temparray);
            }
         } catch (error) {
            console.log(error);
         }
      };

      activitydata();

      return () => {
         ismouted = false;
         controller.abort();
      };
   }, [code, users]);

   const display = act.map((data, index) => {
      return (
         <div className="activity-card flex-align" key={index}>
            <i className="bx bx-file"></i>
            <div className="activitiy-name">
               <p className="fw-semi-bold">{data.title_fld}</p>
               <span className="fs-300">Deadline: {data.deadline_fld}</span>
            </div>
         </div>
      );
   });

   return <div>{display}</div>;
};

export default Activity;
