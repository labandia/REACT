import { createSlice } from "@reduxjs/toolkit";

export const classelecSlice = createSlice({
   name: "cl",
   initialState: {
      classesdata: [],
      activity: [],
      resource: [],
   },
   reducers: {
      selectedclass(state, action) {
         state.classesdata = action.payload;
      },
      selectedactivity(state, action) {
         state.activity = action.payload;
      },

      selectedresources(state, action) {
         state.resource = action.payload;
      },
   },
});

export const classesdata = (state) => state.classes.classesdata;
export const activitydata = (state) => state.classes.activity;
export const resourcesdata = (state) => state.classes.resource;

export const { selectedclass, selectedactivity, selectedresources } =
   classelecSlice.actions;

export default classelecSlice.reducer;
