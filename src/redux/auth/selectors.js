export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => {
  const user = state.auth.user;
  if (!user) return { name: null, email: null };
  if (typeof user === "object") {
    return {
      name: user.name || null,
      email: user.email || null
    };
  }
  return { name: null, email: null };
};

export const selectIsLoading = (state) => state.auth.isLoading;
