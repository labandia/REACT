import { createSlice } from "@reduxjs/toolkit";

export const grocerySlice = createSlice({
   name: "grocery",
   initialState: {
      grocery: [],
   },
   reducers: {
      Additem: (state, action) => {
         state.grocery.push(action.payload);
      },
      Delitem: (state, action) => {
         state.grocery = state.grocery.filter(
            (item) => item.id !== action.payload
         );
      },
      checkitem: (state, action) => {
         state.grocery.map((item) => {
            if (item.id === action.payload) {
               item.checked = !item.checked;
            }
            return item;
         });
      },
   },
});

export const { Additem, Delitem, checkitem } = grocerySlice.actions;
export default grocerySlice.reducer;
