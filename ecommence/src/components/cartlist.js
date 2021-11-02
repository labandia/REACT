import React from 'react';
import './cartlist.css';
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux';
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {updatecart, minuscart} from '../state/action/indext'
import {useDispatch} from 'react-redux';

function Cartlist() {

    let cart = useSelector(state => state.cart);
    const [Gtotal, setgotal] = useState(
        cart.reduce((a,v) =>  a = a + v.price * v.quantity , 0 )
    )
   
    const dispatch = useDispatch();

    useEffect(() => {  
        setgotal(cart.reduce((a,v) =>  a = a + v.price * v.quantity , 0 ))
    }, [cart])


    const addquantity = (row) => {
        // return cart.map((x) => x.id === row.id ? {...x, quantity: x.quantity + 1} : x)
        dispatch(updatecart(row.id));
    };


    const reducequantity = (row) => {
        dispatch(minuscart(row.id));
    };

    

    return (
        <div className="wrapper">
            <Rowdata>
                <li></li>
                <li style={{textAlign: 'start'}}><strong>Product Name</strong></li>
                <li><strong>Category</strong></li>
                <li><strong>Prize</strong></li>
                <li><strong>quantity</strong></li>
            </Rowdata>
            <div>{cart.length === 0 && <div>Cart is Empty </div> }</div>

            {cart.map((item)=> {
                return(
                    <Rowdata key={item.id}>
                        <li><img src={item.image} alt={item.title}></img></li>
                        <li style={{textAlign: 'start'}}>{item.title}</li>
                        <li>{item.category}</li>
                        <li>{item.price}</li>
                        <li><Button variant="contained" color='error' onClick={()=>{reducequantity(item)}}><RemoveIcon></RemoveIcon></Button>
                        {item.quantity}
                        <Button  variant="contained" color='success' onClick={()=>{addquantity(item)}}><AddIcon></AddIcon></Button></li>
                    </Rowdata>
                )  
            })}

            <div className="totalsales">
                <span>Total:  <strong>{Gtotal}</strong></span>
                <Button variant="contained" color="primary">Checkout</Button>
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


