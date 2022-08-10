import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "../../css/resource.css";
import { selectedresources } from "../classes/ClassSelectSlice";

const Resources = ({ code }) => {
   const dispatch = useDispatch();
   const location = useNavigate();
   const [resource, setresource] = useState([]);

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

      const resoucesdata = async (code) => {
         try {
            let res = await axios.get(`resources/${code}`);
            if (res.data.success === true) {
               let temparray = res.data.payload;
               temparray.map((el) => {
                  var d = new Date(el.datetime_fld);
                  el.datetime_fld =
                     d.getDay().toString() + " " + monthNames[d.getMonth()];
                  return el;
               });

               ismouted && setresource(temparray);
            }
         } catch (error) {
            console.log(error);
         }
      };

      resoucesdata(code);

      return () => {
         ismouted = false;
         controller.abort();
      };
   }, [code]);

   const selectresources = (data) => {
      dispatch(selectedresources(data));
      location(`res/${data.rescode_fld}`);
   };

   const resourcedisplay = resource.map((data, index) => {
      return (
         <div
            onClick={() => {
               selectresources(data);
            }}
            className="resources-card flex-align"
            key={index}
         >
            <i className="bx bxs-file-md"></i>
            <div className="resource-name">
               <p className="fw-semi-bold">{data.title_fld}</p>
               <span className="fs-300">Date: {data.datetime_fld}</span>
            </div>
         </div>
      );
   });

   return (
      <div>
         {resource.length !== 0 ? (
            <div>{resourcedisplay}</div>
         ) : (
            <div>No resources posted! 🧐</div>
         )}
      </div>
   );
};

export default Resources;
