import React from 'react'
import styled from 'styled-components'
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {loadcategory, loadproduct} from '../state/action/indext'


function Productslist() {

    const [Selecproduct, setproduct] = useState(false);

    const [Oneproduct, setoneproduct] = useState([]);

    const [searchproduct, setsearch] = useState('');

    const dispatch = useDispatch();

    const arraylist = useSelector(state => state.products.product)
    const category = useSelector(state => state.category.category)



    useEffect(() => {
        dispatch(loadproduct());
        dispatch(loadcategory());
    })

 
  

   

    const getitem = (item) => {
        setproduct(true);
        setoneproduct(item);
    }

    
    return (
        <WrapMain>
        <Sidebar>
              <SiderHeader>
                  <span>Filter</span>
                  <FilterNoneOutlinedIcon></FilterNoneOutlinedIcon>
              </SiderHeader>

              <SiderCategory>
                  <span>Category</span>
                  <div style={{marginTop :"1em"}}>

                  {category && category.map(item=>(
                        <List key={item}>
                            <input type="checkbox" value={item}></input>
                            <span>{item}</span>
                        </List>
                    ))}
                    
                  </div>
              </SiderCategory>
        </Sidebar>
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
                        }).map(list=>(
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
                        <AddCart>
                                 <Custombutton color="error"><FavoriteBorderIcon></FavoriteBorderIcon></Custombutton>
                                 <Custombutton onClick={()=>{dispatch({
                                      type: 'NO_CART',
                                      payload: Oneproduct
                                 })}}  style={{padding : '1em 1.5em'}} variant="contained">${Oneproduct.price} Add to Cart</Custombutton>     
                        </AddCart>
            </ContentSideRight>
        </Content>
    </WrapMain>
    )
}

export default Productslist;



const WrapMain = styled.div`
    display: grid;
    grid-template-columns: 15% 85%;
    
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
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
    gap: 1em;
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em 2em 1em;
    border: 1px solid #d6d5d5;
    border-radius: 10px;

    img{
        width: 150px;
        height: 150px;
        margin-bottom: 1em;
    }

    p{  
        font-weight: 550;
        margin-bottom: .5em;
        text-align: left;
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