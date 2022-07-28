import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Additem, Delitem, checkitem } from "../redux/grocery";

function Grocery() {
   const listitem = useSelector((state) => state.grocery.grocery);
   const dispatch = useDispatch();
   const [name, setname] = useState("");
   const [num, setnum] = useState(0);

   const additem = () => {
      setnum(num + 1);

      let item = {
         id: num,
         date:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
         item: name,
         checked: false,
      };

      if (name !== "") {
         dispatch(Additem(item));
      } else {
         console.log("Please add a new item");
      }

      setname("");
   };

   return (
      <div className="main">
         <div className="grocery">
            <div className="header">
               <h2>Grocery app list </h2>
            </div>
            <div className="grocerycontainer">
               {listitem.length === 0 ? (
                  <div className="noitem">
                     <i className="bx bxl-discord-alt"></i>
                     <p>No item added</p>
                  </div>
               ) : (
                  <div>
                     {listitem.map((item, index) => {
                        return (
                           <div className="grocery-card" key={index}>
                              <div className="flex">
                                 {item.checked ? (
                                    <i
                                       className="bx bx-checkbox-checked"
                                       onClick={() =>
                                          dispatch(checkitem(item.id))
                                       }
                                    ></i>
                                 ) : (
                                    <i
                                       className="bx bx-checkbox"
                                       onClick={() =>
                                          dispatch(checkitem(item.id))
                                       }
                                    ></i>
                                 )}
                                 <div
                                    className="card-title"
                                    style={
                                       item.checked
                                          ? { textDecoration: "line-through" }
                                          : null
                                    }
                                    onDoubleClick={() =>
                                       dispatch(checkitem(item.id))
                                    }
                                 >
                                    <small>{item.date}</small>
                                    <p>{item.item}</p>
                                 </div>
                              </div>
                              <button
                                 onClick={() => dispatch(Delitem(item.id))}
                              >
                                 <i className="bx bxs-trash"></i>
                              </button>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
            <footer className="footer">
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Input items here..."
               />
               <button type="button" onClick={additem}>
                  <i className="bx bx-plus"></i>
               </button>
            </footer>
         </div>
      </div>
   );
}

export default Grocery;
