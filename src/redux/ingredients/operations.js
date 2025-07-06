import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://fullstack-recipes-backend-ssa1.onrender.com/api/ingredients"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
