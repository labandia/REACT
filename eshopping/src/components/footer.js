import React from 'react'
import styled from 'styled-components'
import model from '../images/model-s.jpg'
import model1 from '../images/model-x.jpg'
import model2 from '../images/model-y.jpg'
import model3 from '../images/model3.jpg';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




function footer() {


    return (
        <Footers> 
            <Wrap>
                <Button style={{color: "#fff"}}><ArrowBackIosIcon></ArrowBackIosIcon></Button>
                 <Carcontainer> 
                     <Card>
                         <CarImage src={model}></CarImage>
                         <p>Model-s</p>
                     </Card>

                     <Card>
                         <CarImage src={model1}></CarImage>
                         <p>Model-3</p>
                     </Card>

                     <Card>
                         <CarImage src={model2}></CarImage>
                         <p>Model-L</p>
                     </Card>

                      <Card>
                         <CarImage src={model3}></CarImage>
                         <p>Model-s</p>
                     </Card>

                     <Card>
                         <CarImage src={model1}></CarImage>
                         <p>Model-3</p>
                     </Card>

                     <Card>
                         <CarImage src={model2}></CarImage>
                         <p>Model-L</p>
                     </Card>

                     <Card>
                         <CarImage src={model3}></CarImage>
                         <p>Model-s</p>
                     </Card>

                     <Card>
                         <CarImage src={model1}></CarImage>
                         <p>Model-3</p>
                     </Card>

                     <Card>
                         <CarImage src={model2}></CarImage>
                         <p>Model-L</p>
                     </Card>

                     <Card>
                         <CarImage src={model3}></CarImage>
                         <p>Model-s</p>
                     </Card>

                     <Card>
                         <CarImage src={model1}></CarImage>
                         <p>Model-3</p>
                     </Card>

                     <Card>
                         <CarImage src={model2}></CarImage>
                         <p>Model-L</p>
                     </Card>

                     
                  
                 </Carcontainer>
                 <Button style={{color: "#fff"}}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
            </Wrap>
        </Footers>
    )
}

export default footer

const Footers = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    height: 20vh;
    background: rgba(0,0,0,0.8);
`;

const Wrap = styled.div`
    display:  grid;
    grid-template-columns: 5% 90% 5%;
    height: 100%;
`;

const Carcontainer = styled.div`
    display: flex;
    width: 95%;
    overflow-x: scroll;
    align-items: center;
    gap: 2em;
    padding: 0 3em;
`;

const Card = styled.div`
    text-align: center;
    padding: 10px;
    transition: all .3s;
    cursor: pointer;
    width: 120px;
    hight: 120px;
    p{
        color: #fff;
    }

    &:hover{
        background: rgba(0,0,0,0.4);
    }
`;

const CarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

