import { selectNameFilter } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectRecipes = (state) => state.recipes.items;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectNameFilter],
  (Recipes, textFilter) => {
    console.log("selectFilteredRecipes", Date.now());
    return Recipes.filter((contact) =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
