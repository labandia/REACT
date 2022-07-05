import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Productslist from './components/products/productslist';
import Login from './components/login';
import cartlist from './components/cart/cartlist';
import favorite  from './components/favorite';

function App() {
 

  return (
      <Router>
          <div className="App">
            <Header></Header>
            <Route path='/' exact component={Productslist} />
            <Route path='/cartlist' component={cartlist} />
            <Route path='/login' exact component={Login} />\
            <Route path='/favorite' exact component={favorite} />
          </div>
      </Router>
  );
}

export default App;

