import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
   const [username, setusername] = useState("");
   const [room, setroom] = useState("");
   const [showChat, setshowChat] = useState(false);

   const Joinroom = () => {
      if (username !== "" && room !== "") {
         socket.emit("join_room", room);
         setshowChat(true);
      }
   };

   return (
      <div className="App">
         {!showChat ? (
            <div className="">
               <h3>JOIN CHAT</h3>
               <input
                  type="text"
                  onChange={(event) => {
                     setusername(event.target.value);
                  }}
                  placeholder="Username"
               />
               <input
                  type="text"
                  onChange={(event) => {
                     setroom(event.target.value);
                  }}
                  placeholder="Room Name"
               />
               <button onClick={Joinroom}>Enter</button>
            </div>
         ) : (
            <Chat socket={socket} username={username} room={room} />
         )}
      </div>
   );
}

export default App;
