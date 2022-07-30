import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { userData } from "./FakeData";
import axios from "axios";

export const getaccounts = createAsyncThunk(
   "student/fetchtstudent",
   async () => {
      try {
         let result = await axios
            .get(`http://localhost:5000/accounts`)
            .then((response) => {
               return response.data.payload;
            });

         return result;
      } catch (error) {
         return error;
      }
   }
);

export const userSlice = createSlice({
   name: "users",
   initialState: {
      usersdata: [],
      isloading: false,
   },
   // reducers: {
   //    AddUser: (state, action) => {
   //       state.value.push(action.payload);
   //    },
   //    Delete: (state, action) => {
   //       state.value = state.value.filter(
   //          (user) => user.id !== action.payload.id
   //       );
   //    },

   //    Update: (state, action) => {
   //       state.value.forEach((user) => {
   //          if (user.id === action.payload.id) {
   //             user.username = action.payload.username;
   //          }
   //       });
   //    },
   // },

   extraReducers(builder) {
      builder
         .addCase(getaccounts.pending, (state, action) => {
            state.isloading = true;
         })
         .addCase(getaccounts.fulfilled, (state, action) => {
            state.usersdata = action.payload;
            console.log(action.payload);
            state.isloading = false;
         })
         .addCase(getaccounts.rejected, (state, action) => {
            state.isloading = false;
         });
   },
});

// export const { AddUser, Delete, Update } = userSlice.actions;
export default userSlice.reducer;
