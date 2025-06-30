import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://fullstack-recipes-backend-ssa1.onrender.com/api";

export const fetchAll = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      console.log("fetching");
      const res = await axios.get("/recipes");
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchById = createAsyncThunk("/recipes/:id",   async (_, thunkAPI) => {
  try {
    console.log("fetching");
    const res = await axios.get(`/recipes/${"id here later"}`);
    //   console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

export const addRecipe = createAsyncThunk(
  "recipes/addrecipe",
  async (newTask, thunkAPI) => {
    try {
      const res = await axios.post("/recipes", newTask);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



//  NO DELETING... FOR NOW!
// export const deleterecipe = createAsyncThunk(
//   "recipes/deleterecipe",
//   async (taskId, thunkAPI) => {
//     try {
//       const res = await axios.delete(`recipes/${taskId}`);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
