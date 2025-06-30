import { createSlice } from "@reduxjs/toolkit";

import { fetchAll, addRecipe} from "./operations";

import { logOut } from "../auth/operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAll.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state) => {
        state.loading = false;
        state.error = true;
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
