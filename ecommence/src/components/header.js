import React from 'react'
import styled from 'styled-components'
import logo from '../logo.svg';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Header() {
    const cart = useSelector(state => state.cart);

    const [islogin] = useState(true)

    return (
        <Nav>
            <Link to='/' style={{textDecoration:'none', color: '#222'}}>
                <Brand>
                    <Image src={logo}></Image>
                    <span>Eshopping</span>
                </Brand>
            </Link>

            <List>
                <span>{cart.length}</span>
                <Link to='/favorite'>
                    <IconButton aria-label="favorite">
                        <FavoriteBorderIcon></FavoriteBorderIcon>
                    </IconButton>
                </Link>
               
                <Link to='/cartlist'>
                    <Carticon aria-label="shop">
                        <ShoppingBasketOutlinedIcon></ShoppingBasketOutlinedIcon>
                    </Carticon>
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