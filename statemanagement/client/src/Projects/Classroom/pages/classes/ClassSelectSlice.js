import { createSlice } from "@reduxjs/toolkit";

export const classelecSlice = createSlice({
   name: "cl",
   initialState: {
      classesdata: [],
   },
   reducers: {
      selectedclass(state, action) {
         state.classesdata = action.payload;
      },
   },
});

export const classesdata = (state) => state.classes.classesdata;
export const { selectedclass } = classelecSlice.actions;

export default classelecSlice.reducer;
