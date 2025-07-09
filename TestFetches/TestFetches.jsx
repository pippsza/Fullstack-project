import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchById,
  fetchByPages,
  addRecipe,
  fetchOwnRecipes,
  fetchFavouriteRecipes,
  deleteFavouriteRecipe,
  addFavouriteRecipe,
} from "../src/redux/recipes/operations.js";
import {
  selectAllRecipes,
  selectFilteredRecipes,
} from "../src/redux/recipes/selectors";

export default function TestFetches() {
  const [page, setPage] = useState(1);
  const data = useSelector(selectFilteredRecipes);
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);

  const handleFetch = () => {
    dispatch(fetchByPages({ page, perPage: 2 }));
    setPage((prev) => prev + 1);
  };

  const handleFetchById = () => {
    dispatch(fetchById("6462a8f74c3d0ddd28897fcd"));
  };

  const handleAddRecipe = () => {
    const formData = new FormData();
    formData.append("title", "test");
    formData.append("time", "123");
    formData.append("category", "test");
    formData.append("description", "test");
    formData.append("instructions", "test");
    formData.append("ingredients[0][id]", "640c2dd963a319ea671e366c");
    formData.append("ingredients[0][measure]", "4-5 pound");
    dispatch(addRecipe(formData));
  };

  const handleFetchOwn = () => {
    dispatch(fetchOwnRecipes());
  };

  const handleFetchFavorite = () => {
    dispatch(fetchFavouriteRecipes());
  };

  const handleDeleteFavorite = () => {
    dispatch(deleteFavouriteRecipe("6462a8f74c3d0ddd28898054"));
  };

  const handleAddFavorite = (id) => {
    dispatch(addFavouriteRecipe(id));
  };
}
