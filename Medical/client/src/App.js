import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import ProtectedRoute from './ProtectedRoute';
import { LoginContext } from './services/AuthContext';
//COMPONENTS
import Login from './views/Login/LoginPage'
import Admin from './views/Admin/Admin';
import DashboardPage from './views/Admin/Dashboard/DashboardPage';
import UserManagePage from './views/Admin/Usermanage/UserManagePage';
import Medicine from './views/Admin/Medicine/medicine';
import Suppliers from './views/Admin/Suppliers/Suppliers';
import Inventory from './views/Admin/inventory/inventory';

function App() {

  const [isaccess, setisaccess] = useState(false);
 
  
 

  return (
    <LoginContext.Provider value={{isaccess, setisaccess}}>
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<Login />} />
          
              <Route path="admin/*" element={
                  <ProtectedRoute >
                    <Admin />
                  </ProtectedRoute>
              } > 
                  <Route path="dash" element={<DashboardPage />} />
                  <Route path="user" element={<UserManagePage />} />
                  <Route path="medicine" element={<Medicine />} />
                  <Route path="supplies" element={<Suppliers />} />
                  <Route path="invent" element={<Inventory />} />
              </Route>
        
          
        </Routes>
      </BrowserRouter>
     </LoginContext.Provider>
  );
}

export default App;
