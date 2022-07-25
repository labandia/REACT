import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

export const getPhotos = createAsyncThunk("photos/getphotos", async () => {
   const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=5`);
   const result = await res.json();
   return result;
});

export const GallerySlice = createSlice({
   name: "gallery",
   initialState: {
      photos: [],
      isloading: false,
   },
   extraReducers: {
      [getPhotos.pending]: (state) => {
         state.isloading = true;
      },
      [getPhotos.fulfilled]: (state, action) => {
         state.photos = action.payload;
         state.isloading = false;
      },
      [getPhotos.rejected]: (state) => {
         state.isloading = false;
      },
   },
});

export default GallerySlice.reducer;
