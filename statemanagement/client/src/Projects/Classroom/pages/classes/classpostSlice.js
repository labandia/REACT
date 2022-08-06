import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchposts = createAsyncThunk("post/fetchpost", async (code) => {
   try {
      const res = await axios.get(`getpost/${code}`);
      return [...res.data.payload];
   } catch (error) {}
});

const postslice = createSlice({
   name: "post",
   initialState: {
      posts: [],
      status: "idle",
      error: null,
   },
   reducers: {
      postAdded: {
         reducer(state, action) {
            state.posts.push(action.payload);
         },
         prepare() {
            return {
               payload: {},
            };
         },
      },
   },
   extraReducers(builder) {
      builder
         .addCase(fetchposts.pending, (state, action) => {
            state.status = "loading";
         })
         .addCase(fetchposts.fulfilled, (state, action) => {
            state.status = "succeeded";
         })
         .addCase(fetchposts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export const postdata = (state) => state.post.posts;
export const { postAdded } = postslice.reducer;
