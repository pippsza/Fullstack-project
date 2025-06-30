import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";






const persistedAuthReducer = persistReducer(
  {
    key: "token",
    storage,
    whitelist: ["token"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

store.subscribe(() => {
  const state = store.getState();
  console.log("[STORE SUBSCRIBE] state.auth.token:", state.auth.token);
  try {
    const persisted = localStorage.getItem('authKey');
    console.log("[STORE SUBSCRIBE] localStorage[authKey]:", persisted);
  } catch (e) {
    console.log("[STORE SUBSCRIBE] localStorage error:", e);
  }
});