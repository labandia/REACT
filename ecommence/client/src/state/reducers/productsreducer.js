import * as types from '../action/actiontype'

const initalState = {
    product: []
};

export const Productsreducer = (state = initalState, action) => {
    switch(action.type){
        case types.GET__PRODUCTS:
            return{
                ...state,
                product: action.payload
            }
        default: 
            return state;
    }
};
