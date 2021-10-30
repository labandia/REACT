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
        default: 
            return state;
    }
};

export default Cartreducers