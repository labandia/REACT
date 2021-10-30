import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Productslist from './components/productslist';
import Login from './components/login';
import cartlist from './components/cartlist';

function App() {
 

  return (
      <Router>
          <div className="App">
            <Header></Header>
            <Route path='/' exact component={Productslist} />
            <Route path='/cartlist' component={cartlist} />
            <Route path='/login' exact component={Login} />
          </div>
      </Router>
  );
}

export default App;

