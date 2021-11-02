import * as types from './actiontype'
import axios from 'axios'

const getproduct = (item) => (
    {
        type: types.GET__PRODUCTS,
        payload: item
    }
)


const getcategory = (item) => (
    {
        type: types.GET__CATEGORY,
        payload: item
    }
)

export const getCart = (item) => (
    {
        type: types.NO_CART,
        payload: item
    }
)


export const updatecart = (index) => (
    {
        type: types.INCREMENT,
        index
    }
)


export const minuscart = (index) => (
    {
        type: types.DECREMENT,
        index
    }
)



export const loadproduct = () =>{
    return function   (dispatch){
        axios.get('https://fakestoreapi.com/products').then((response)=>{
            dispatch(getproduct(response.data));   
        }).catch(error => console.log(error));
    }
}


export const loadcategory = () =>{
    return function   (dispatch){
        axios.get('https://fakestoreapi.com/products/categories').then((response)=>{
            dispatch(getcategory(response.data));   
        }).catch(error => console.log(error));
    }
}

export const loadcart = () =>{
    return function   (dispatch){
        // let cart = JSON.parse(localStorage.getItem('cart'));
        dispatch({
            type: '',
            payload: []
        })
    }
}