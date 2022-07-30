import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Mainlayout() {
   return (
      <div className="all">
         <Header />
         <section className="classwrap">
            <Outlet />
         </section>
      </div>
   );
}

export default Mainlayout;
