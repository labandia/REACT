import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Usermain from "./components/usersmain";
import Grocery from "./components/grocery";
import Gallery from "./components/gallery";
import Classroom from "./Projects/Classroom/Classroom";
import "./index.css";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/users" element={<Usermain />} />
         <Route path="/grocery" element={<Grocery />} />
         <Route path="/gallery" element={<Gallery />} />
         <Route path="/classroom" element={<Classroom />} />
      </Routes>
   );
}

export default App;
