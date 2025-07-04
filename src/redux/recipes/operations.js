import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "../auth/operations";
import { setAuthHeader } from "../auth/operations";

export const fetchByPages = createAsyncThunk(
  "recipes/fetchAll",
  async ({ page, perPage = 12 }, thunkAPI) => {
    try {
      console.log("fetching");
      const res = await authInstance.get(
        `/recipes?page=${page}&perPage=${perPage}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchById = createAsyncThunk(
  "/recipes/:id",
  async (id, thunkAPI) => {
    try {
      const res = await authInstance.get(`/recipes/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    console.log("fetchOwnRecipes - started");
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      if (persistedToken) {
        setAuthHeader(persistedToken);
      }
      console.log("fetchOwnRecipes - params:", { page, perPage });
      const res = await authInstance.get(
        `/recipes/own?page=${page}&perPage=${perPage}`
      );
      console.log("fetchOwnRecipes - response:", res.data);
      return res.data;
    } catch (error) {
      console.error("fetchOwnRecipes - error:", error);
      throw error;
    } finally {
      console.log("fetchOwnRecipes - finished");
    }
  }
);

export const fetchFavouriteRecipes = createAsyncThunk(
  "recipes/fetchFavouriteRecipes",
  async ({ page = 1, perPage = 12 }, thunkAPI) => {
    console.log("fetchFavouriteRecipes - started");
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      if (persistedToken) {
        setAuthHeader(persistedToken);
      }
      console.log("fetchFavouriteRecipes - params:", { page, perPage });
      const res = await authInstance.get(
        `/recipes/favorite?page=${page}&perPage=${perPage}`
      );
      console.log("fetchFavouriteRecipes - response:", res.data);
      return res.data;
    } catch (error) {
      console.error("fetchFavouriteRecipes - error:", error);
      throw error;
    } finally {
      console.log("fetchFavouriteRecipes - finished");
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addrecipe",
  async (payload, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      console.log("adding recipe");
      setAuthHeader(persistedToken);
      const res = await authInstance.post("/recipes", payload);
      console.log(res.data);
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
