import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
   name: "auth",
   initialState: {
      user: "",
      token: "",
      status: false,
      email: "",
   },
   reducers: {
      changetoken: (state, actions) => {
         const { token } = actions.payload;
         state.token = token;
      },
      setCredentials: (state, actions) => {
         const { user, token, email } = actions.payload;
         state.user = user;
         state.email = email;
         state.token = token;
         state.status = true;
      },
      logout: (state, action) => {
         state.user = null;
         state.token = null;
         state.status = false;
      },
   },
});

export const { setCredentials, logout, changetoken } = AuthSlice.actions;

export default AuthSlice.reducer;

export const currentuser = (state) => state.auth.user;
export const currentoken = (state) => state.auth.token;
export const status = (state) => state.auth.status;
