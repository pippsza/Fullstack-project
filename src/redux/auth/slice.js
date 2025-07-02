import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refreshUser, register, session } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload.data || action.payload || {};
        state.user = payload.user || { name: null, email: null };
        state.token = payload.accessToken || payload.token || null;
        state.isLoggedIn = !!(
          payload.user &&
          (payload.accessToken || payload.token)
        );
        state.isLoading = false;
        state.error = null;
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
        const payload = action.payload.data || action.payload || {};
        state.user = payload.user || { name: null, email: null };
        state.token = payload.accessToken || payload.token || null;
        state.isLoggedIn = !!(
          payload.user &&
          (payload.accessToken || payload.token)
        );
        state.isLoading = false;
        state.error = null;
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
        const payload = action.payload.data || action.payload || {};
        state.user = payload.user || { name: null, email: null };
        state.token = payload.accessToken || state.token;
        state.isLoggedIn = !!payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(session.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(session.fulfilled, (state, action) => {
        const payload = action.payload.data || action.payload || {};
        state.user = payload.user || state.user;
        state.isLoggedIn = !!payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(session.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
        state.token = null;
      })
});

export const authReducer = authSlice.reducer;
