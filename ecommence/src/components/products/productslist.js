import React from 'react'
import styled, { keyframes } from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {loadcategory, loadproduct, getCart} from '../../state/action/indext'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Checkbox from '@mui/material/Checkbox';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './product.css'
import { TransitionStatus } from "react-transition-group/";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

   const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
  `;
  
   const slideOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
  `;
  
   const slideUpAnimation = keyframes`
      from {
          opacity: 0;
          transform: translateY(100%);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  `;
  
   const slideDownAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
  `;


  const duration = { enter: 500, exit: 300 };
const STAGGER = 100;


function Productslist() {

    const [Selecproduct, setproduct] = useState(false);

    const [Oneproduct, setoneproduct] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [already, setalready] = React.useState(false);
    const [rate, setrate] = useState(0);

    const [searchproduct, setsearch] = useState('');

    const Dispatch = useDispatch();

    const arraylist = useSelector(state => state.products.product)
    const category = useSelector(state => state.category.category)
    const cart = useSelector(state => state.cart);

    const [checked, setChecked] = React.useState(true);
    



    useEffect(() => {
        Dispatch(loadproduct());
        Dispatch(loadcategory());
    }, [])

 
    const handleClick = (message) => {
        if(message === true){
            setOpen(true);
        }else{
            setalready(true);
        }
    };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


      const AlreadyClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setalready(false);
      };


      const Checkfavorite = (event) => {
        setChecked(event.target.checked);
      };

   

    const getitem = (item) => {
        setproduct(true);
        setoneproduct(item);
        setrate(item['rating'].rate)
    }


    const additem =(item)=>{
       
        const exist = cart.find((x) => x.id === item.id);

        if(exist){
            handleClick(false)
            return false
        }else{
            item.quantity = 1;
            Dispatch(getCart(item))
            handleClick(true)
        }
    }
    
    return (
        <WrapMain>
        {/* <Sidebar>
              <SiderHeader>
                  <span>Filter</span>
                  <FilterNoneOutlinedIcon></FilterNoneOutlinedIcon>
              </SiderHeader>

              <SiderCategory>
                  <span>Category</span>
                  <div style={{marginTop :"1em"}}>

                  {category && category.map(item=>(
                        <List key={item}>
                            
                             <Checkbox  defaultChecked />
                            <span>{item}</span>
                        </List>
                    ))}
                    
                  </div>
              </SiderCategory>
        </Sidebar> */}
        <Content>
        
            <ContentProducts>

            <Inputbox>
                <SearchIcon></SearchIcon>
                <input placeholder="Search product"
                onChange={(event) => setsearch(event.target.value)}
                ></input>
                <CloseIcon></CloseIcon>
                
            </Inputbox>

            <SortContainer>
                <span>Sort :</span>
            </SortContainer>

                <CardWrapper>
                        {arraylist && arraylist.filter((val)=>{
                            if(searchproduct === ""){
                                return val
                            } else if(val.title.toLowerCase().includes(searchproduct.toLowerCase())){
                                return val
                            }
                            return false;
                        }).map((list, index)=>(
                            <Card key={list.id} >
                            <img src={list.image} alt={list.title}></img>
                            <p>{list.title}</p>
                            <Cardfooter>
                                <CardAction>
                                        <Carprice>
                                            <small>Price</small>
                                            <p>${list.price}</p>
                                        </Carprice>
                                        <Custombutton onClick={()=>getitem(list)} variant="contained">Add to Cart</Custombutton>
                                </CardAction>   
                            </Cardfooter>    
                        </Card>
                        ))}
                </CardWrapper>
                
            </ContentProducts>

            <ContentSideRight show={Selecproduct}>
                        <IconButton aria-label="favorite" style={{position: 'absolute', top: '1em', right: '1em', color: '#222'}} onClick={()=>setproduct(false)}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                        <img src={Oneproduct.image} alt={Oneproduct.title}></img>
                        <CardCatergory>{Oneproduct.category}</CardCatergory>
                        <h2>{Oneproduct.title}</h2>
                        <CardDesc>{Oneproduct.description}</CardDesc>

                        <Rating
                            name="text-feedback"
                            value={rate}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />

                        <AddCart>
                                 <Checkbox color="error"  onChange={Checkfavorite}  icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                 <Custombutton onClick={()=>{additem(Oneproduct)}}  style={{padding : '1em 1.5em'}} variant="contained">${Oneproduct.price} Add to Cart</Custombutton>     
                        </AddCart>


                        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Item Added!!!
                                    </Alert>
                        </Snackbar>

                        <Snackbar open={already} autoHideDuration={1000} onClose={AlreadyClose}>
                                    <Alert onClose={AlreadyClose} severity="info" sx={{ width: '100%' }}>
                                        Item Already Added Check to cart Button!!!
                                    </Alert>
                        </Snackbar>
            </ContentSideRight>
        </Content>
    </WrapMain>
    )
}

export default Productslist;

const TodoItemCell = styled.div`
  &.appear,
  &.enter {
    animation-name: ${slideInAnimation};
    animation-duration: ${duration.enter}ms;
    animation-timing-function: ease-in-out;
  }

  animation-fill-mode: both;

  &.appear {
    animation-name: ${slideUpAnimation};
    animation-delay: ${({ index }) => index * STAGGER}ms;
  }

  &.exit {
    animation-name: ${slideOutAnimation};
    animation-duration: ${duration.exit}ms;
    animation-timing-function: ease-in-out;
  }
`;



const WrapMain = styled.div`
    display: grid;
    grid-template-columns: 100%;
    
`;

const Sidebar = styled.div`
    border-right: 2px solid #f5f5f5;
`;

const SiderHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 2em;
    text-align: center;
    border-bottom: 2px solid #f5f5f5;
`;

const SiderCategory = styled.div`
    padding: 2em;
    height: 90vh;
    h4{
      font-weight: 600;
    }
`;

const List = styled.li`
    display:flex;
    align-items: center;
    gap: 1em;
    list-style: none;
    padding: .5em 0;
`;


const Content = styled.div`
    width: 100%;
    display: flex;
`;

const Inputbox = styled.div`
    display: flex;
    align-items: center;
    background: #f5f5f5;
    padding: 1em;

    input{
        width: 100%;
        border: none;
        background: none;
        font-family: "Poppins", sans-serif;
        outline: none;
        padding: 0 1em;
        font-size: 1rem;
    }
`;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
    gap: 1em;
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 2em 2em 1em;
    border: 1px solid #d6d5d5;
    border-radius: 10px;

    img{
        width: 150px;
        height: 150px;
        margin-inline: auto;
        margin-bottom: 1em;
    }

    p{  
        font-weight: 550;
        margin-bottom: .5em;
        line-height: 1.6;
        text-align: left !important;
    }
`;

const  Cardfooter = styled.div`
    width: 100%;
`;

const CardAction = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Carprice = styled.div`
    small{
        color: #626262;
    }
    p{
        font-weight: 500;
    }
`;

const Custombutton = styled(Button)`
    font-family: 'Poppins', sans-serif !important;
    text-transform: capitalize !important;
`;

const SortContainer = styled.div`
    margin: 1.5em 0;
`;

const CardDesc = styled.p`
    overflow: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6; /* number of lines to show */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.8;
    margin-bottom: 1em;
`;

const CardCatergory = styled.span`
    margin-top: 1em;
    border-radius: 25px;
    font-size: .8rem;
    font-weight: 600;
    padding: .2em 1em;
    background: #addafc;
    color: hsl(206, 99%, 35%);
`;

const ContentProducts = styled.div`
    width: 100%;
    padding: 2em;
    height: 90vh;
    overflow: auto;

    &::-webkit-scrollbar{
        display: none !important;
    }
`;

const ContentSideRight = styled.div`
    width: 40%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 90vh;
    border-left: 2px solid #f5f5f5;
    transition: .5s all;
    margin-right: ${props => props.show ? '0' : '-100%'};
    padding: 3em 2em;
    position: sticky;

    img{
        max-width: 100%;
        width: 200px;
        height: 200px;
        margin-left: 20%;
        margin-top: 1em;
    }

    h2{
        margin: .5em 0;
    }
    
`;

const AddCart = styled.div`
    position: absolute;
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    padding: 2em 1em;
`;