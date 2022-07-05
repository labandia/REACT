import React from 'react'
import styled from 'styled-components'
import logo from '../logo.svg';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

function Header() {
    const cart = useSelector(state => state.cart);

    const [islogin] = useState(false)

   

    return (
        <Nav>
            <Link to='/' style={{textDecoration:'none', color: '#222'}}>
                <Brand>
                    <Image src={logo}></Image>
                    <span>Eshopping</span>
                </Brand>
            </Link>

            <List>
               
                <Link to='/favorite'>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                </Link>
               
                <Link to='/cartlist'>
                        <BtnWrap>
                                <Carticon aria-label="shop" style={{backgroundColor:"none"}}>
                                <ShoppingBasketOutlinedIcon></ShoppingBasketOutlinedIcon>
                            </Carticon>
                            {cart.length !== 0 && <span style={{backgroundColor:"crimson"}}>{cart.length}</span>}
                        </BtnWrap>
                </Link>

                {islogin 
                    ?
                    <Link to='/login' style={{textDecoration:'none', color: '#222'}}>
                              <Button variant="contained">Sign-up</Button>
                    </Link>
                    :<Imageprofile src='https://avatars.dicebear.com/api/male/john.svg'></Imageprofile>
                }
                
                
            </List>
            
    
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10vh;
    border-bottom: 3px solid #f5f5f5;
    padding: 0 3em;
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    span{
        font-weight: 600;
    }
`;

const List = styled.li`
    display:flex;
    align-items: center;
    gap: 1em;
    list-style: none;
    margin: 0;
    padding: 0;
`;


const Image = styled.img`
    width: 50px;
    height: 50px;
`;

const Imageprofile = styled.img`
    width: 40px;
    height: 40px;
    position: relative;
    border: 2px solid #16ad76;
    border-radius: 50%;
    

    &:after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: -15px;
        left: -15px;
        right: -15px;
        bottom: -15px;
        background: red;
        z-index: -1;
    }
`;


const Carticon = styled(IconButton)`

`

const BtnWrap = styled.div`
    position: relative;
    span{
        position: absolute;
        width: 20px;
        display: flex;
        align-items:center;
        justify-content: center;
        height: 20px;
        border-radius: 50%;
        font-size: .8rem;
        color: #fff;
        bottom: 0;
        right: 0;
    }
`;