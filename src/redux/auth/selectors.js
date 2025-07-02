import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = createSelector(
  (state) => state.auth.user,
  (user) => ({
    name: user?.name || null,
    email: user?.email || null
  })
);

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;
