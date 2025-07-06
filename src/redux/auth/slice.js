import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logOut,
  refreshUser,
  register,
  getUserInfo,
} from "./operations";
import { setAuthHeader, clearAuthHeader } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Register fulfilled - payload:", action.payload);
        state.user = action.payload.data;
        state.isLoading = false;
        state.error = null;
        console.log("State after register:", state);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fulfilled - payload:", action.payload);
        state.token = action.payload.data.accessToken;
        setAuthHeader(action.payload.data.accessToken);
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
        console.log("State after login:", state);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        clearAuthHeader();
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        console.log("REFRESH USER PAYLOAD", action.payload);
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.data.accessToken;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        console.log("GetUserInfo fulfilled - payload:", action.payload);
        state.user = action.payload.data;
        state.isLoading = false;
        state.error = null;
        console.log("State after getUserInfo:", state);
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
        state.token = null;
        clearAuthHeader();
      }),
});

export const authReducer = authSlice.reducer;
