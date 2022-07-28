import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
   name: "auth",
   initialState: {
      user: "",
      token: "",
      status: false,
   },
   reducers: {
      setCredentials: (state, actions) => {
         console.log(actions.payload);
         const { user, token } = actions.payload;
         state.user = user;
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

export const { setCredentials, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

export const currentuser = (state) => state.auth.user;
export const currentoken = (state) => state.auth.token;
export const status = (state) => state.auth.status;
