import { createSlice } from "@reduxjs/toolkit";

import {
  fetchByPages,
  addRecipe,
  fetchById,
  fetchOwnRecipes,
  fetchFavouriteRecipes,
  deleteFavouriteRecipe,
} from "./operations";

import { logOut } from "../auth/operations";

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
        // Добавляем в ownItems и allItems
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

        const newItems = action.payload.data.data;
        const page = action.payload.data.page;
        state.items.ownItems.totalItems = action.payload.data.totalItems;
        const hasNextPage = action.payload.data.hasNextPage;
        const hasPreviousPage = action.payload.data.hasPreviousPage;

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
        // state.loading = false;
        // state.error = false;

        // state.items.ownItems.items = action.payload.data.data;
        // state.items.ownItems.page = action.payload.data.page;
        // state.items.ownItems.hasNextPage = action.payload.data.hasNextPage;
        // state.items.ownItems.hasPreviousPage =
        //   action.payload.data.hasPreviousPage;
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
        // state.loading = false;
        // state.error = false;

        // state.items.favoriteItems.items = action.payload.data.data;
        // state.items.favoriteItems.page = action.payload.data.page;
        // state.items.favoriteItems.hasNextPage = action.payload.data.hasNextPage;
        // state.items.favoriteItems.hasPreviousPage =
        //   action.payload.data.hasPreviousPage;
        state.loading = false;
        state.error = false;

        const newItems = action.payload.data.data;
        const page = action.payload.data.page;
        state.items.favoriteItems.totalItems = action.payload.data.totalItems;
        const hasNextPage = action.payload.data.hasNextPage;
        const hasPreviousPage = action.payload.data.hasPreviousPage;

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
      .addCase(deleteFavouriteRecipe.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteFavouriteRecipe.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        console.log(state.items.favoriteItems.items);
        state.items.favoriteItems.items =
          state.items.favoriteItems.items.filter(
            (recipe) => recipe._id !== deletedId
          );

        state.items.favoriteItems.totalItems = Math.max(
          0,
          state.items.favoriteItems.totalItems - 1
        );
        state.loading = false;
      })
      .addCase(deleteFavouriteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
