import { Link } from "react-router-dom";
import React from "react";
import "./Home.css";
import grocery from "../images/Grocery.png";

function Home() {
   return (
      <div className="home">
         <header className="homeheader">
            <div className="homecontainer">
               <h1>My Projects sample</h1>
            </div>
         </header>

         <main>
            <div className="homecontainer">
               <ul>
                  {/* <li>
                     <div className="box"></div>
                     <span>User Manage</span>
                  </li> */}

                  <Link to="/users" className="list">
                     <div className="box"></div>
                     <span>User Manage</span>
                  </Link>

                  <Link to="/gallery" className="list">
                     <div className="box"></div>
                     <span>Gallery Photos</span>
                  </Link>

                  <Link to="/grocery" className="list">
                     <img src={grocery} className="box" />
                     <span>Grocery app</span>
                  </Link>

                  <Link to="/classroom" className="list">
                     <div className="box"></div>
                     <span>GC LAMP</span>
                  </Link>
               </ul>
            </div>
         </main>
      </div>
   );
}

export default Home;
