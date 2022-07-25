import { createSlice } from "@reduxjs/toolkit";
import { userData } from "./FakeData";

export const userSlice = createSlice({
   name: "users",
   initialState: { value: userData },
   reducers: {
      AddUser: (state, action) => {
         state.value.push(action.payload);
      },
      Delete: (state, action) => {
         state.value = state.value.filter(
            (user) => user.id !== action.payload.id
         );
      },

      Update: (state, action) => {
         state.value.forEach((user) => {
            if (user.id === action.payload.id) {
               user.username = action.payload.username;
            }
         });
      },
   },
});

export const { AddUser, Delete, Update } = userSlice.actions;
export default userSlice.reducer;
