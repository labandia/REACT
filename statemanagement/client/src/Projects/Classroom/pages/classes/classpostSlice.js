import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { includefiles } from "./postservice";

import axios from "../../api/axios";

export const fetchposts = createAsyncThunk("post/fetchpost", async (code) => {
   try {
      const res = await axios.get(`getpost/${code}`);
      const newpostdata = includefiles(res.data.payload);
      return [...newpostdata];
   } catch (error) {}
});

export const addposts = createAsyncThunk("post/addpost", async (load) => {
   let arr = [];
   try {
      const res = await axios.post("posdata", load, {
         withCredentials: true,
      });
      // console.log(res.data.payload);
      arr.push(res.data.payload);
      // array = res.data.payload;

      const newpostdata = includefiles(arr);

      return newpostdata;
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
         prepare(
            classcode_fld,
            authorid_fld,
            content_fldt,
            withfile_fld,
            dir_fld
         ) {
            return {
               payload: {
                  classcode_fld,
                  authorid_fld,
                  content_fldt,
                  withfile_fld,
                  dir_fld,
               },
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
            state.posts = action.payload;
         })
         .addCase(fetchposts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         })

         .addCase(addposts.fulfilled, (state, action) => {
            state.posts.unshift(action.payload[0]);
         });
   },
});

export const postdata = (state) => state.post.posts;
export const poststatus = (state) => state.post.status;

export const { postAdded } = postslice.actions;

export default postslice.reducer;
