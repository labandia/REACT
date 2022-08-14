import { Routes, Route } from "react-router-dom";
// import Home from "./Home/Home";
import Usermain from "./Projects/Usermangament/usersmain";
import Grocery from "./Projects/GroceryTodolist/grocery";
import Newanim from "./Projects/animations/newanim";
// import Uploadsite from "./Projects/Uploadimage/Uploadsite";
import Gallery from "./components/gallery";
import Mainlayout from "./Projects/Classroom/pages/Mainlayout";
import Classroom from "./Projects/Classroom/Classroom";
import Classes from "./Projects/Classroom/pages/classes/Classes";
import Classpost from "./Projects/Classroom/pages/classes/Classpost";
import ViewActivity from "./Projects/Classroom/pages/classes/ViewActivity";
import ViewResources from "./Projects/Classroom/pages/classes/ViewResources";

import ProtectedRoute from "./Projects/Classroom/Protected-route";
import News from "./Projects/Classroom/pages/news/News";
import Newscontent from "./Projects/Classroom/pages/news/Newscontent";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Classroom />} />
         {/* <Route path="/users" element={<Usermain />} />
         <Route path="/grocery" element={<Grocery />} />
         <Route path="/gallery" element={<Gallery />} /> */}
         <Route path="/anime" element={<Newanim />} />
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
            <Route path="classes/:classcode" element={<Classpost />} />
            <Route
               path="classes/:classcode/:actcode_fld"
               element={<ViewActivity />}
            />

            <Route
               path="classes/:classcode/res/:rescode_fld"
               element={<ViewResources />}
            />
            <Route path="news" element={<News />} />
            <Route path="news/newscontent" element={<Newscontent />} />
         </Route>
      </Routes>
   );
}

export default App;
