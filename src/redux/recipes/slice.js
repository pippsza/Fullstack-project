import { createSlice } from "@reduxjs/toolkit";

import { logOut } from "../auth/operations";
import {
  addRecipe,
  fetchById,
  fetchByPages,
  fetchFavouriteRecipes,
  deleteFavouriteRecipe,
  fetchOwnRecipes,
  addFavouriteRecipe,
} from "./operations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: {
      ownItems: {
        page: 1,
        items: [],
        hasNextPage: false,
        hasPreviousPage: false,
        totalItems: 0,
      },
      allItems: {
        page: 1,
        items: [],
        hasNextPage: false,
        hasPreviousPage: false,
      },
      favoriteItems: {
        page: 1,
        items: [],
        hasNextPage: false,
        hasPreviousPage: false,
        totalItems: 0,
      },
    },
    currentRecipe: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByPages.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchByPages.fulfilled, (state, action) => {
        state.loading = false;
        // Обновляем allItems
        const newItems = action.payload.data.data;
        const page = action.payload.data.page;
        const hasNextPage = action.payload.data.hasNextPage;
        const hasPreviousPage = action.payload.data.hasPreviousPage;
        const existingIds = new Set(
          state.items.allItems.items.map((item) => item._id)
        );
        const uniqueNewItems = newItems.filter(
          (item) => !existingIds.has(item._id)
        );
        state.items.allItems.items = [
          ...state.items.allItems.items,
          ...uniqueNewItems,
        ];
        state.items.allItems.page = page;
        state.items.allItems.hasNextPage = hasNextPage;
        state.items.allItems.hasPreviousPage = hasPreviousPage;
      })
      .addCase(fetchByPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.items.allItems.items = [];
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.ownItems.items.push(action.payload);
        state.items.allItems.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.currentRecipe = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentRecipe = action.payload.data;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.currentRecipe = null;
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;

        // Проверка на наличие данных
        const payload =
          action.payload && action.payload.data ? action.payload.data : {};
        const newItems = Array.isArray(payload.data) ? payload.data : [];
        const page = payload.page || 1;
        state.items.ownItems.totalItems = payload.totalItems || 0;
        const hasNextPage = payload.hasNextPage || false;
        const hasPreviousPage = payload.hasPreviousPage || false;

        if (page === 1) {
          state.items.ownItems.items = newItems;
        } else {
          const existingIds = new Set(
            state.items.ownItems.items.map((i) => i._id)
          );
          const filteredNewItems = newItems.filter(
            (i) => !existingIds.has(i._id)
          );
          state.items.ownItems.items = [
            ...state.items.ownItems.items,
            ...filteredNewItems,
          ];
        }

        state.items.ownItems.page = page;
        state.items.ownItems.hasNextPage = hasNextPage;
        state.items.ownItems.hasPreviousPage = hasPreviousPage;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items.ownItems.items = [];
      })
      .addCase(fetchFavouriteRecipes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFavouriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const payload =
          action.payload && action.payload.data ? action.payload.data : {};
        const newItems = Array.isArray(payload.data) ? payload.data : [];
        const page = payload.page || 1;
        state.items.favoriteItems.totalItems = payload.totalItems || 0;
        const hasNextPage = payload.hasNextPage || false;
        const hasPreviousPage = payload.hasPreviousPage || false;

        if (page === 1) {
          state.items.favoriteItems.items = newItems;
        } else {
          const existingIds = new Set(
            state.items.favoriteItems.items.map((i) => i._id)
          );
          const filteredNewItems = newItems.filter(
            (i) => !existingIds.has(i._id)
          );
          state.items.favoriteItems.items = [
            ...state.items.favoriteItems.items,
            ...filteredNewItems,
          ];
        }

        state.items.favoriteItems.page = page;
        state.items.favoriteItems.hasNextPage = hasNextPage;
        state.items.favoriteItems.hasPreviousPage = hasPreviousPage;
      })
      .addCase(fetchFavouriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.items.favoriteItems.items = [];
      })
      .addCase(addFavouriteRecipe.pending, (state) => {
        console.log("addFavouriteRecipe.pending");
        state.loading = true;
        state.error = false;
      })
      .addCase(addFavouriteRecipe.fulfilled, (state, action) => {
        console.log("addFavouriteRecipe.fulfilled", action.payload);
        state.loading = false;
        state.error = false;
        const exists = state.items.favoriteItems.items.some(
          (item) => item._id === action.payload._id
        );
        if (!exists) {
          state.items.favoriteItems.items.push(action.payload);
          state.items.favoriteItems.totalItems =
            (state.items.favoriteItems.totalItems || 0) + 1;
        }
      })
      .addCase(addFavouriteRecipe.rejected, (state, action) => {
        console.log("addFavouriteRecipe.rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFavouriteRecipe.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        console.log("deleteFavouriteRecipe.fulfilled, deletedId:", deletedId);
        console.log(
          "favoriteItems.items before:",
          state.items.favoriteItems.items
        );
        state.items.favoriteItems.items =
          state.items.favoriteItems.items.filter(
            (recipe) => recipe._id !== deletedId
          );
        console.log(
          "favoriteItems.items after:",
          state.items.favoriteItems.items
        );
        state.items.favoriteItems.totalItems = Math.max(
          0,
          state.items.favoriteItems.totalItems - 1
        );
        state.loading = false;
      })
      .addCase(deleteFavouriteRecipe.pending, (state) => {
        console.log("deleteFavouriteRecipe.pending");
        state.loading = true;
        state.error = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items.ownItems = {
          page: 1,
          items: [],
          hasNextPage: false,
          hasPreviousPage: false,
        };
        state.items.allItems = {
          page: 1,
          items: [],
          hasNextPage: false,
          hasPreviousPage: false,
        };
        state.items.favoriteItems = {
          page: 1,
          items: [],
          hasNextPage: false,
          hasPreviousPage: false,
        };
      });
    // .addCase(deleteRecipe.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.items = state.items.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    // })
    // .addCase(deleteRecipe.rejected, (state) => {
    //   state.loading = false;
    //   state.error = true;
    // })
  },
});

export default slice.reducer;
