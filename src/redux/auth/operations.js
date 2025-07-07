import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://fullstack-recipes-backend-ssa1.onrender.com/api",
});
authInstance.defaults.withCredentials = true;

export const setAuthHeader = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  authInstance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      console.log("Register operation - sending data:", formData);
      const { data } = await authInstance.post("/auth/register", formData);
      console.log("Register operation - received response:", data);
      return data;
    } catch (error) {
      console.error("Register operation - error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      console.log("Login operation - sending data:", formData);
      const { data } = await authInstance.post("/auth/login", formData);
      console.log("Login operation - received response:", data);
      return data;
    } catch (error) {
      console.error("Login operation - error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { data } = await authInstance.post("/auth/logout");
    clearAuthHeader();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    console.log("persisted token!", persistedToken);

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await authInstance.post("/auth/refresh");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    console.log("GetUserInfo operation - token:", persistedToken);

    if (persistedToken === null) {
      console.error("GetUserInfo operation - no token available");
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      console.log("GetUserInfo operation - making request to /users");
      const { data } = await authInstance.get("/users");
      console.log("GetUserInfo operation - received response:", data);
      return data;
    } catch (error) {
      console.error("GetUserInfo operation - error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
