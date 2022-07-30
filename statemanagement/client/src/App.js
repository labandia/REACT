import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Usermain from "./Projects/Usermangament/usersmain";
import Grocery from "./Projects/GroceryTodolist/grocery";
import Gallery from "./components/gallery";
import Mainlayout from "./Projects/Classroom/pages/Mainlayout";
import Classroom from "./Projects/Classroom/Classroom";
import Classes from "./Projects/Classroom/pages/classes/Classes";
import ProtectedRoute from "./Projects/Classroom/Protected-route";
import News from "./Projects/Classroom/pages/news/News";
import Newscontent from "./Projects/Classroom/pages/news/Newscontent";

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
            <Route path="news" element={<News />} />
            <Route path="newscontent" element={<Newscontent />} />
         </Route>
      </Routes>
   );
}

export default App;
