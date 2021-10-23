import './App.css';
import Home from './components/home';
import Footer from './components/footer';
import styled from 'styled-components';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import tesla from './images/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [burgerstatus, setBurgerStatus] = useState(false);
 

  return (
    <Maincontainer>
        <Navigation>
            <Wrapper>
                <Brandlogo src={tesla} />
                <Listcontain>
                    <li><Link>Shop </Link></li>
                    <li><Link>tesla account</Link></li>
                    <Button onClick={()=>setBurgerStatus(true)} style={{color: "#222"}}><MenuIcon></MenuIcon></Button>
                </Listcontain>
            </Wrapper>
        </Navigation>

        <Home />
        <Footer />
        <BurgerNav show={burgerstatus}>
            <Headmenu>
                <p>Menu</p>
                <Button onClick={()=>setBurgerStatus(false)}><CloseIcon></CloseIcon></Button>
            </Headmenu>
            <li>
                <Custombutton >Existing Inventory</Custombutton>
                <Custombutton>Used Inventory</Custombutton>
                <Custombutton>Trade-in</Custombutton>
                <Custombutton>RoadMaster</Custombutton>
            </li>
        </BurgerNav>
    </Maincontainer>
  );
}

export default App;


const Maincontainer = styled.div`
    position: relative;
    height: 100vh;
    margin: 0;
    padding: 0;
    z-index: 0;
`;



const Navigation = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 8vh;
`;

const Wrapper = styled.div`
    max-width: 100rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Brandlogo = styled.img`
`;

const Listcontain = styled.ul`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    li{
        margin: 0 10px;
        padding: .1em .5em;
        font-weight: 600;
        cursor: pointer;
        &:hover{
            background: rgba(0,0,0,0.2);
        }
    }
`;

const Link = styled.a`
    margin: 0;
    text-decoration: none;
    color: #222;
`;





const BurgerNav = styled.div`
   position: fixed;
   box-shadow: 1px 2px 5px rgba(0,0,0,0.4);
   width: 250px;
   padding: 1em;
   top: 0;
   bottom: 0;
   background: #fff;
   z-index: 10;
   right: 0;
   transition: .5s ease;
   transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
 
   li{
    display: flex;
    flex-direction: column;

    a{
      text-decoration: none;
    }
   }
`;

const Headmenu = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 0 .5em;
   margin-bottom: 1em;
//    border-bottom: 1px solid #626262;
   p{
        margin-left: 10px;
        font-weight: bold;
   }
`;

const Custombutton = styled(Button)`
    display: flex;
    font-family: "Poppins", sans-serif !important;
    text-transform: capitalize !important;
    padding: .5em 0 !important;
    color: #222 !important;
    font-size: 1rem !important;
    margin-bottom: 1em !important;
    &:hover{
        background: #1565c0 !important;
        color: #fff !important;
    }
`;
