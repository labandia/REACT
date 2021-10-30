import React from 'react';
import './cartlist.css';
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux';
import styled from 'styled-components'





function Cartlist() {

    const cart = useSelector(state => state.cart);

    // const add = () => {
    //     setquantity(quantity + 1)
    //     console.log(quantity + 1)
    // }   

    const render = cart.map((item)=> {
        return(
            <Rowdata key={item.id}>
                <li><img src={item.image}></img></li>
                <li style={{textAlign: 'start'}}>{item.title}</li>
                <li>{item.category}</li>
                <li>{item.price}</li>
                <li>12</li>
            </Rowdata>
        )  
  })

 
    

    return (
        <div className="wrapper">
            <Rowdata>
                <li></li>
                <li style={{textAlign: 'start'}}><strong>Product Name</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Prize</strong></li>
                <li><strong>quantity</strong></li>
            </Rowdata>

            {render}  



            <div className="totalsales">
                <span>Total: <strong></strong></span>
                <Button variant="contained" 
                style={{background: '#222',  color: '#fff', fontFamily: 'Poppins, sans-serif !important'}}
                >Checkout</Button>
            </div>
        </div>
    )
}

export default Cartlist


const Rowdata = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 90rem;
    margin: 1em auto;
    padding: 1.5em;
    border: 1px solid rgb(204, 204, 204);
    li{
        width: 25%;
        text-align: center;
        list-style: none;
        padding: .5em 1em;
    }

    img{
        width: 80px;
        height: 80px;
    }
`;


