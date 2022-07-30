import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import trunk from "redux-thunk";
import userReducer from "./Globalredux/User";
import galleryReducer from "./Globalredux/galleryReducer";
import groceryReducer from "./Globalredux/grocery";
import AuthReducers from "./Projects/Classroom/redux/auth";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
   reducer: {
      user: userReducer,
      gallery: galleryReducer,
      grocery: groceryReducer,
      auth: AuthReducers,
   },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();