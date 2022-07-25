import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers/rootreducers";
import trunk from "redux-thunk";

const store = createStore(rootReducer, {});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './reducers/userReducers';
// import cartreducers from "./reducers/cartreducers";

// const store = configureStore({
//     reducer:{
//         user: userReducer,
//         cart: cartreducers
//     }
// })

// export default store;
