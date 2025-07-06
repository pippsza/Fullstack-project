import { createSlice } from "@reduxjs/toolkit";

// const slice = createSlice({
//   name: "filters",
//   initialState: {
//     ingredients: [],
//     category: "",
//   },
//   reducers: {
//     changeFilter: (state, action) => {
//       state.name = action.payload;
//     },
//   },
// });

// export default slice.reducer;

// export const { changeFilter } = slice.actions;

const initialState = {
  query: "",
  category: "",
  ingredient: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setQuery, setCategory, setIngredient, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
