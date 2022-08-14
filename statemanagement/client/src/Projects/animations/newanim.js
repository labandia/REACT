import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
   Transition,
   CSSTransition,
   SwitchTransition,
   TransitionGroup,
} from "react-transition-group";

const Newanim = () => {
   const [items, setItems] = useState([
      { id: uuidv4(), text: "Buy eggs" },
      { id: uuidv4(), text: "Pay bills" },
      { id: uuidv4(), text: "Invite friends over" },
      { id: uuidv4(), text: "Fix the TV" },
   ]);

   return (
      <div>
         <TransitionGroup className="todo-list">
            {items.map(({ id, text }) => (
               <CSSTransition key={id} timeout={500} classNames="item">
                  <li className="list-item">
                     <button
                        className="remove-btn"
                        variant="danger"
                        size="sm"
                        onClick={() =>
                           setItems((items) =>
                              items.filter((item) => item.id !== id)
                           )
                        }
                     >
                        &times;
                     </button>
                     {text}
                  </li>
               </CSSTransition>
            ))}
         </TransitionGroup>

         <button
            onClick={() => {
               const text = prompt("Enter some text");
               if (text) {
                  setItems((items) => [...items, { id: uuidv4(), text }]);
               }
            }}
         >
            Add Item
         </button>
      </div>
   );
};

export default Newanim;
