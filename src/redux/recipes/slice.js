import { createSlice } from "@reduxjs/toolkit";

import { fetchByPages, addRecipe, fetchById } from "./operations";

import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    currentRecipe: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByPages.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchByPages.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("state", JSON.parse(JSON.stringify(state)));

        const newItems = action.payload.data.data;
        const existingIds = new Set(state.items.map((item) => item._id));

        const uniqueNewItems = newItems.filter(
          (item) => !existingIds.has(item._id)
        );

        state.items = [...state.items, ...uniqueNewItems];
      })
      .addCase(fetchByPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.items = [];
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.currentRecipe = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentRecipe = action.payload.data;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.currentRecipe = null;
        state.loading = false;
        state.error = action.payload.message;
      })
      // .addCase(deleteRecipe.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.items = state.items.filter(
      //     (item) => item.id !== action.payload.id
      //   );
      // })
      // .addCase(deleteRecipe.rejected, (state) => {
      //   state.loading = false;
      //   state.error = true;
      // })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default slice.reducer;
