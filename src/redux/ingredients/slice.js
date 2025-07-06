import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    fetchIngredientsStart(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchIngredientsSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
    },
    fetchIngredientsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsFailure,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
