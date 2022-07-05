// import {createSlice} from '@reduxjs/toolkit';

// const cart = [];

// export const useSlice = createSlice({
//     name: 'cart',
//     initialState: { 
//         cart
//     },
//     reducers: {
//         cart: (state, action) => {
//             state.value = action.payload
//         }
//     }
// })


// // export const {login} = useSlice.actions;

// export default useSlice.reducer;
 





import * as types from '../action/actiontype'

const initalState = [];


export const Cartreducers = (state = initalState, action) => {
    switch(action.type){
        case types.NO_CART: 
            return [...state, action.payload];
        case types.INCREMENT:
            return state.map(product => {
                if(product.id === action.index){
                    return { ...product, quantity: product.quantity + 1}
                }
                return product
            })
        case types.DECREMENT:
                return state.map(product => {
                    if(product.id === action.index && product.quantity > 0){
                        return { ...product, quantity: product.quantity - 1}
                    }
                    return product
            })
        default: 
            return state;
    }
};

export default Cartreducers