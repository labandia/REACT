import * as types from '../action/actiontype'

const initalState = {
    category: []
};


export const CatergoryReducer = (state = initalState, action) => {
    switch(action.type){
        case types.GET__CATEGORY: 
            return{
                ...state,
                category: action.payload
            }
        default: 
            return state;
    }
};