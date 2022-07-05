import styled, { keyframes, css }  from 'styled-components'
import React from 'react'
import { CSSTransition } from 'react-transition-group';
import Button from '@mui/material/Button';

function Favorite() {
    const [showBox, setShowBox] = React.useState(false);

    const handleClick = () => {
        setShowBox((b) => !b);
      };


    return (
        <div>
            <Button onClick={handleClick}>{showBox ? "HIDE BOX" : "SHOW BOX"}</Button>
            <CSSTransition in = {showBox} timeout={3000} mountOnEnter unmountOnExit appear>
                <Box> sdsd</Box>
            </CSSTransition>
        </div>
    )
}

export default Favorite


const boxEnterAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  20% {
    transform: translateX(70vw);
  }
  50% {
    transform: translateX(70vw) rotate(360deg) scale(2);
    border-radius: 50%;
  }
  100% {
    transform: translateX(70vw);
  }
`;


const Box = styled.div`
    width: 50px; 
    height: 50px;
    margin-top: 50px;
    background: blue;
    color: #fff;

    &.enter-active, &.appear-active, &.enter-done{
        animation: ${boxEnterAnimation} 3s forwards;
    }

    &.exit-active{
        animation: ${boxEnterAnimation} 3s;
    }
`;
