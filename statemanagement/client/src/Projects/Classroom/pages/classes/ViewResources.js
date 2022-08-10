import React from "react";
import { useSelector } from "react-redux";
import { resourcesdata } from "./ClassSelectSlice";
import { useNavigate } from "react-router-dom";

const ViewResources = () => {
   const location = useNavigate();
   const actdata = useSelector(resourcesdata);

   return (
      <div>
         <button
            onClick={() => {
               location(-1);
            }}
         >
            BACK{" "}
         </button>
         ViewResources
      </div>
   );
};

export default ViewResources;
