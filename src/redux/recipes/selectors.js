import { selectFilters } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectRecipes = (state) => state.recipes.items;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectOwnRecipes = (state) => state.recipes.items.ownItems.items;
export const selectAllRecipes = (state) => state.recipes.items.allItems.items;
export const selectFavoriteRecipes = (state) =>
  state.recipes.items.favoriteItems.items;

export const selectOwnRecipesPage = (state) =>
  state.recipes.items.ownItems.page;
export const selectAllRecipesPage = (state) =>
  state.recipes.items.allItems.page;
export const selectFavoriteRecipesPage = (state) =>
  state.recipes.items.favoriteItems.page;

export const selectOwnRecipesHasNextPage = (state) =>
  state.recipes.items.ownItems.hasNextPage;
export const selectOwnRecipesHasPreviousPage = (state) =>
  state.recipes.items.ownItems.hasPreviousPage;
export const selectAllRecipesHasNextPage = (state) =>
  state.recipes.items.allItems.hasNextPage;
export const selectAllRecipesHasPreviousPage = (state) =>
  state.recipes.items.allItems.hasPreviousPage;
export const selectFavoriteRecipesHasNextPage = (state) =>
  state.recipes.items.favoriteItems.hasNextPage;
export const selectFavoriteRecipesHasPreviousPage = (state) =>
  state.recipes.items.favoriteItems.hasPreviousPage;

export const selectOwnRecipesTotal = (state) => state.recipes.items.ownItems.totalItems;
export const selectFavoriteRecipesTotal = (state) => state.recipes.items.favoriteItems.totalItems;

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectFilters],
  (Recipes, textFilter) => {
    console.log("selectFilteredRecipes", Date.now());
    return Recipes.filter((contact) =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);

export const selectFilteredOwnRecipes = createSelector(
  [selectOwnRecipes, selectFilters],
  (recipes, textFilter) => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);

export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;

export const selectOwnRecipesObject = (state) => state.recipes.items.ownItems;
export const selectAllRecipesObject = (state) => state.recipes.items.allItems;
