import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useSelector} from 'react-redux'

export function Footer() {
    const getcar = useSelector((state)=> state.cars.cars);
    // const [getitem, setitem] = useState(getcar)
    const render = getcar.map((item)=> {
          return(
            <Card key={item.id} >
                <CarImage src={`../images/` + item.image} ></CarImage>
                <p>{item.title}</p>
            </Card>
          )  
    })

    return (
        <Footers> 
            <Wrap>
                <Button style={{color: "#fff"}}><ArrowBackIosIcon></ArrowBackIosIcon></Button>
                 <Carcontainer> 
                     {render}
                 </Carcontainer>
                 <Button style={{color: "#fff"}}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
            </Wrap>
        </Footers>
    )
}

export default Footer;

const Footers = styled.div`
    width: 100rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,0.8);
`;

const Wrap = styled.div`
    display:  grid;
    grid-template-columns: 5% 90% 5%;
    height: 100%;
`;

const Carcontainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em 3em;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none !important;
    }
`;

const Card = styled.div`
    text-align: center;
    padding: 10px;
    transition: all .3s;
    cursor: pointer;
 
    p{
        color: #fff;
    }

    &:hover{
        background: rgba(0,0,0,0.4);
    }
`;

const CarImage = styled.img`
    width: 200px;
    height: 100px;
    object-fit: cover;
`;

