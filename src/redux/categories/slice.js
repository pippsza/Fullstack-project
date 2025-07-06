import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', 
  error: null      
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchCategoriesFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
