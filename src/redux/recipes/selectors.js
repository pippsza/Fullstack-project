import { selectNameFilter } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectRecipes = (state) => state.recipes.items;

export const selectLoading = (state) => state.recipes.loading;

export const selectError = (state) => state.recipes.error;

// ЯК БУДЕ ЕНДПОІНТ НА РЕЦЕПТИ - ДОПИСАТИ ЛОГІКУ ФІЛЬТРУ. ЦЕ НА СЕРГІЯ КВАЧ ЗАЛИШУ :))))))

export const selectFilteredRecipes = createSelector(
  [selectRecipes, selectNameFilter],
  (Recipes, textFilter) => {
    console.log("selectFilteredRecipes", Date.now());
    return Recipes.filter((contact) =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);
