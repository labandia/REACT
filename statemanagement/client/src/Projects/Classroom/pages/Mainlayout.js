import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "../css/main.css";

function Mainlayout() {
   return (
      <section className="classwrap">
         <Header />

         <Outlet />
      </section>
   );
}

export default Mainlayout;
