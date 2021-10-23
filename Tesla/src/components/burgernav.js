import React from 'react'
import Button from '@mui/material/Button';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';



function burgernav() {
    

    return (
        <BurgerNav>
            <Headmenu>
                <p>Menu</p>
                <Button><CloseIcon></CloseIcon></Button>
            </Headmenu>
            <li>
                <Custombutton >Existing Inventory</Custombutton>
                <Custombutton>Used Inventory</Custombutton>
                <Custombutton>Trade-in</Custombutton>
                <Custombutton>RoadMaster</Custombutton>
            </li>
        </BurgerNav>
    )
}

export default burgernav



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
    padding: 1em 0 !important;
    color: #222 !important;
    font-size: 1rem !important;
    &:hover{
        background: #1565c0 !important;
        color: #fff !important;
    }
`;