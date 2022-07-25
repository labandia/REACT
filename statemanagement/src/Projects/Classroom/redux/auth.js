import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
   name: "auth",
   initialState: {
      user: "",
      token: "",
   },
   reducers: {
      setCredentials: (state, actions) => {
         console.log(actions.payload);
         const { user, token } = actions.payload;
         state.user = user;
         state.token = token;
      },
      logout: (state) => {
         state.user = null;
         state.token = null;
      },
   },
});

export const { setCredentials, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

export const currentuser = (state) => state.auth.user;
export const currentoken = (state) => state.auth.token;
