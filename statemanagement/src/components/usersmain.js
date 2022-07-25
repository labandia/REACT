import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AddUser, Delete, Update } from "../redux/User";
import "../index";

function Usermain() {
   const dispatch = useDispatch();
   const userlist = useSelector((state) => state.user.value);

   const [fullname, setfullname] = useState("");
   const [username, setusername] = useState("");
   const [newname, setnewname] = useState("");

   const submit = () => {
      // console.log(userlist[userlist.length - 1]);
      dispatch(
         AddUser({
            id: userlist[userlist.length - 1].id + 1,
            name: fullname,
            username,
         })
      );

      setusername("");
      setfullname("");
   };

   const input = {
      backgroundColor: "#f5f5f5",
      border: "none",
      padding: "1em",
   };

   return (
      <div className="App">
         {""}
         <div className="Users">
            <input
               type="text"
               style={input}
               placeholder="name"
               onChange={(event) => setfullname(event.target.value)}
            />
            <input
               type="text"
               style={input}
               placeholder="usernmae"
               onChange={(event) => setusername(event.target.value)}
            />
            <button type="button" onClick={submit}>
               Add users
            </button>
         </div>

         <div className="container">
            {userlist.map((user, index) => {
               return (
                  <div className="card" key={index}>
                     <small>{user.id}</small>
                     <strong>{user.name}</strong>
                     <p>{user.username}</p>
                     <input
                        type="text"
                        placeholder="name"
                        onChange={(event) => setnewname(event.target.value)}
                     />
                     <button
                        type="button"
                        onClick={() => {
                           dispatch(
                              Update({
                                 id: user.id,
                                 username: newname,
                              })
                           );
                        }}
                     >
                        Update
                     </button>
                     <button
                        type="button"
                        onClick={() => {
                           dispatch(
                              Delete({
                                 id: user.id,
                              })
                           );
                        }}
                     >
                        Delete
                     </button>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Usermain;
