import React from 'react'
import styled from 'styled-components';
import tesla from '../images/logo.svg';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';


function header() {

    return (
        <Navigation>
            <Wrapper>
                <Brandlogo src={tesla} />
                <Listcontain>
                    <li><Link>Shop </Link></li>
                    <li><Link>tesla account</Link></li>
                    <Button style={{color: "#222"}}><MenuIcon></MenuIcon></Button>
                </Listcontain>
            </Wrapper>
        </Navigation>
    )
}

export default header

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
        padding: .2em 1em;
        font-weight: 600;
    }
`;

const Link = styled.a`
    margin: 0 .5em;
    text-decoration: none;
    color: #222;
`;
