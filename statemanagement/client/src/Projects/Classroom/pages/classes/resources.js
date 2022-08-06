import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Resources = ({ code }) => {
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

   const resourcedisplay = resource.map((data, index) => {
      return (
         <div className="resources-card flex-align" key={index}>
            <i className="bx bx-file"></i>
            <div className="resource-name">
               <p className="fw-semi-bold">{data.title_fld}</p>
               <span className="fs-300">Date: {data.datetime_fld}</span>
            </div>
         </div>
      );
   });

   return <div>{resourcedisplay}</div>;
};

export default Resources;
