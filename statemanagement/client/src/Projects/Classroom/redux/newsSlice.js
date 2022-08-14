import { createSlice } from "@reduxjs/toolkit";

export const newcontentSlice = createSlice({
   name: "news",

   initialState: {
      loading: "idle",
      newsdata: [],
   },
   reducers: {
      selectednew(state, action) {
         state.newsdata = action.payload;
      },
   },
});

export const selectdata = (state) => state.news.newsdata;

export const { selectednew } = newcontentSlice.actions;

export default newcontentSlice.reducer;
