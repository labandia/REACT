import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux';


export function Home() {
    const getcar = useSelector((state)=> state.cars.cars);
    console.log(getcar[0]);
   

    return (
        <Container>
            <Textwrap>
                <h1>{getcar[0].title}</h1>
                <p>{getcar[0].description}</p>
                <ButtonWrap>
                    <Custombutton variant="contained">Custom order</Custombutton>
                    <Custombutton variant="contained" style={{background: "#222"}}>Existing Inventory</Custombutton>
                </ButtonWrap>
            </Textwrap>
            <Image src={`../images/` + getcar[0].image} draggable={false}></Image>
        </Container>
    )
}

export default Home


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