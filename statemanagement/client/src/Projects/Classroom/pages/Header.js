import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/auth";
import logo from "../../../images/logo.png";
import "../css/header.css";

function Header() {
   const location = useNavigate();
   const dispatch = useDispatch();
   const [openmenu, setopenmenu] = useState(false);
   const [opennavi, setopennavi] = useState(false);

   const openhandle = () => {
      setopenmenu(!openmenu);
   };

   const opennav = () => {
      setopennavi(!opennavi);
   };

   const handlelogout = () => {
      dispatch(logout());
      location("");
   };

   return (
      <div>
         <header className="primary">
            <div className="primary__wrapper container flex-space">
               <div className="primary-nav flex-align">
                  <img src={logo} alt="" className="primary-img" />
                  <a href="/#" className="fw-bold">
                     R3LAMP
                  </a>
               </div>
               <nav className="primary__navigation flex-align">
                  <ul
                     className={`primary__navlist ${
                        opennavi ? "activenav" : " "
                     }`}
                  >
                     <li>
                        <Link to="classes" className="nav-active">
                           Classes
                        </Link>
                     </li>
                     <li>
                        <Link to="news">News</Link>
                     </li>
                     <li>
                        <Link to="classes">Forums</Link>
                     </li>

                     <li>
                        <Link to="classes">Ebooks</Link>
                     </li>

                     <i onClick={opennav} className="bx bx-x-circle"></i>
                  </ul>
                  <i onClick={opennav} className="bx bxs-grid"></i>
                  <div className="nav__account flex-align">
                     {/* <span>Mr Franklyn</span> */}
                     <div onClick={openhandle} className="nav__imgcontainer">
                        <img src={logo} alt="" />
                     </div>
                  </div>

                  {/* <div className={`menu fs-500 ${openmenu ? "active" : ""}`}>
                     <p>Profile Settings</p>
                     <strong className=" fw-bold ">View Profile</strong>
                     <p>Change password</p>
                     <hr />
                     <button
                        className="fw-semi-bold fs-500"
                        onClick={handlelogout}
                     >
                        Logout
                     </button>
                  </div> */}
               </nav>
            </div>
         </header>
      </div>
   );
}

export default Header;
