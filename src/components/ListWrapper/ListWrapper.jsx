import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ListWrapper.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteRecipes,
  fetchOwnRecipes,
} from "../../redux/recipes/operations";
import { useParams } from "react-router-dom";
import {
  selectRecipesError,
  selectRecipesLoading,
  selectFavoriteRecipes,
  selectOwnRecipes,
  selectFavoriteRecipesHasNextPage,
  selectOwnRecipesHasNextPage,
  selectOwnRecipesPage,
  selectFavoriteRecipesPage,
  selectOwnRecipesTotal,
  selectFavoriteRecipesTotal,
} from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";

export default function ListWrapper() {
  const { recipeType } = useParams();
  const dispatch = useDispatch();

  const total =
    recipeType === "own"
      ? useSelector(selectOwnRecipesTotal)
      : useSelector(selectFavoriteRecipesTotal);

  const items =
    recipeType === "own"
      ? useSelector(selectOwnRecipes)
      : useSelector(selectFavoriteRecipes);

  const hasNextPage =
    recipeType === "own"
      ? useSelector(selectOwnRecipesHasNextPage)
      : useSelector(selectFavoriteRecipesHasNextPage);

  const page =
    recipeType === "own"
      ? useSelector(selectOwnRecipesPage)
      : useSelector(selectFavoriteRecipesPage);

  const isLoading = useSelector(selectRecipesLoading);
  const isError = useSelector(selectRecipesError);
  const isFirstLoad = isLoading && page === 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (page === 1) {
          if (recipeType === "own") {
            await dispatch(fetchOwnRecipes({ page })).unwrap();
          } else if (recipeType === "favourites") {
            await dispatch(fetchFavouriteRecipes({ page })).unwrap();
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, [page, recipeType, dispatch]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      if (recipeType === "own") {
        await dispatch(fetchOwnRecipes({ page: nextPage })).unwrap();
      } else {
        await dispatch(fetchFavouriteRecipes({ page: nextPage })).unwrap();
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <>
      {isFirstLoad && <Loader />}
      {isError && <b>Whoops, there was an error pls reload...</b>}
      <p className={style.totalRecipes}>{total || 0} recipes</p>
      {items && <RecipesList items={items} />}
      {isLoading && <Loader />}
      {hasNextPage && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
