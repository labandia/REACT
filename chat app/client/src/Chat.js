import React, { useState, useEffect } from "react";

function Chat({ socket, username, room }) {
   const [currentmessage, setcurrentmessage] = useState("");
   const [messagelist, setmessagelist] = useState([]);

   const sendMessage = async () => {
      if (currentmessage !== "") {
         const messageData = {
            room: room,
            author: username,
            message: currentmessage,
            time:
               new Date(Date.now()).getHours() +
               ":" +
               new Date(Date.now()).getMinutes(),
         };

         await socket.emit("send_message", messageData);
         setmessagelist((list) => [...list, messageData]);
         setcurrentmessage("");
      }
   };

   useEffect(() => {
      socket.on("receive_message", (data) => {
         setmessagelist((list) => [...list, data]);
      });
   }, [socket]);

   return (
      <div>
         <div className="chat-header">
            <p>Live Chat</p>
         </div>
         <div className="chat-body">
            {messagelist.map((messagecontent) => {
               return (
                  <div
                     className=""
                     key={messagecontent.id}
                     id={username === messagecontent.author ? "you" : "other"}
                  >
                     <p>{messagecontent.message}</p>
                     <small>{messagecontent.time}</small>
                  </div>
               );
            })}
         </div>
         <div className="chat-footer">
            <input
               type="text"
               value={currentmessage}
               onChange={(event) => {
                  setcurrentmessage(event.target.value);
               }}
               onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
               }}
               placeholder="message here"
            />
            <button onClick={sendMessage}>Enter</button>
         </div>
      </div>
   );
}

export default Chat;
