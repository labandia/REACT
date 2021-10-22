import React from 'react'
import styled from 'styled-components'
import model2 from '../images/model-y.jpg'
import Button from '@mui/material/Button';


function home() {


    return (
        <Container>
            <Textwrap>
                <h1>Tesla Model X</h1>
                <p>Order Online for Touchless Delivery</p>
                <ButtonWrap>
                    <Custombutton variant="contained">Custom order</Custombutton>
                    <Custombutton variant="contained" style={{background: "#222"}}>Existing Inventory</Custombutton>
                </ButtonWrap>
            </Textwrap>
            <Image src={model2}></Image>
        </Container>
    )
}

export default home


const Container = styled.div`
    position: relative;
    z-index: 0;
    height: 100vh
    background-color: #222;
`;

const Image = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
`;

const Textwrap = styled.div`
    position: absolute;
    left: 9%;
    top: 28%;
    h1{
        font-size: 3rem;
       
    }
    p{
        margin-bottom: 1em;
        font-size: 1.2rem;
    }
`;

const Custombutton = styled(Button)`
    font-family: "Poppins", sans-serif !important;
    text-transform: capitalize !important;
    padding: .5em 1em !important;
`;

const ButtonWrap = styled.div`
    display: flex;
    align-item: center;
    gap: 1em;
`;