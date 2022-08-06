import React from "react";

const Chatbase = ({ open }) => {
   return (
      <div className="selectedbutton">
         <button className={open ? "active" : ""}>
            <i className="bx bx-message-dots"></i>
         </button>
      </div>
   );
};

export default Chatbase;
