import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getaccounts } from "../../Globalredux/User";
import axios from "axios";

function Usermain() {
   const dispatch = useDispatch();
   const userlist = useSelector((state) => state.user.usersdata);

   const [password, setpassword] = useState("");

   const submit = async (id) => {
      const content = {
         id: id,
         password: password,
      };
      try {
         await axios.post(`http://localhost:5000/updatepassword`, content);
      } catch (error) {
         return error;
      }
   };

   useEffect(() => {
      dispatch(getaccounts());
   }, [dispatch]);

   return (
      <div className="App">
         <div className="userwrap">
            <h1 className="fs-700 fw-bold">User management</h1>

            <table className="userstable">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>firstname</th>
                     <th>Lastname</th>
                     <th className="limit">Hashpassord</th>
                     <th>salt</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {userlist.map((user, index) => {
                     return (
                        <tr key={index}>
                           <td>{user.studnum_fld}</td>
                           <td>{user.fname_fld}</td>
                           <td>{user.lname_fld}</td>
                           <td>
                              <p className="limit">{user.hashpassword}</p>
                           </td>
                           <td className="limit">
                              <p className="limit">{user.salt}</p>
                           </td>
                           <td className="flex-align">
                              <input
                                 onChange={(e) => setpassword(e.target.value)}
                                 type="text"
                                 placeholder="Enter password"
                              />
                              <button onClick={() => submit(user.studnum_fld)}>
                                 <i className="bx bx-save"></i>
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Usermain;
