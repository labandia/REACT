import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Usermain from "./components/usersmain";
import Grocery from "./components/grocery";
import Gallery from "./components/gallery";
import Mainlayout from "./Projects/Classroom/pages/Mainlayout";
import Classroom from "./Projects/Classroom/Classroom";
import Classes from "./Projects/Classroom/pages/Classes";
import ProtectedRoute from "./Projects/Classroom/Protected-route";
import News from "./Projects/Classroom/pages/News";
import "./index.css";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/users" element={<Usermain />} />
         <Route path="/grocery" element={<Grocery />} />
         <Route path="/gallery" element={<Gallery />} />

         {/* CLASSROOM PROJECT*/}
         <Route path="classroom" element={<Classroom />} />
         <Route
            path="main/*"
            element={
               <ProtectedRoute>
                  <Mainlayout />
               </ProtectedRoute>
            }
         >
            <Route path="classes" element={<Classes />} />
         </Route>
      </Routes>
   );
}

export default App;
