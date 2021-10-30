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



export const loadproduct = () =>{
    return function async  (dispatch){
        axios.get('https://fakestoreapi.com/products').then((response)=>{
            dispatch(getproduct(response.data));   
        }).catch(error => console.log(error));
    }
}


export const loadcategory = () =>{
    return function async  (dispatch){
        axios.get('https://fakestoreapi.com/products/categories').then((response)=>{
            dispatch(getcategory(response.data));   
        }).catch(error => console.log(error));
    }
}

export const loadcart = () =>{
    return function async  (dispatch){
        // let cart = JSON.parse(localStorage.getItem('cart'));
        dispatch({
            type: '',
            payload: []
        })
    }
}