import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ListWrapper.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteRecipes,
  fetchOwnRecipes,
  fetchByFilters,
} from "../../redux/recipes/operations";
import { useLocation, useParams } from "react-router-dom";
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
  selectFilteredRecipes,
  selectFilteredRecipesHasNextPage,
  selectFilteredRecipesPage,
  selectFilteredRecipesTotal,
} from "../../redux/recipes/selectors";
import Loader from "../Loader/Loader";

export default function ListWrapper({ filter, setFilter }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { recipeType } = useParams();

  const isMainPage = location.pathname === "/";

  // Витягуємо дані з Redux для кожного типу
  const items = useSelector(
    isMainPage
      ? selectFilteredRecipes
      : recipeType === "own"
      ? selectOwnRecipes
      : selectFavoriteRecipes
  );

  const total = useSelector(
    isMainPage
      ? selectFilteredRecipesTotal
      : recipeType === "own"
      ? selectOwnRecipesTotal
      : selectFavoriteRecipesTotal
  );

  const page = useSelector(
    isMainPage
      ? selectFilteredRecipesPage
      : recipeType === "own"
      ? selectOwnRecipesPage
      : selectFavoriteRecipesPage
  );

  const hasNextPage = useSelector(
    isMainPage
      ? selectFilteredRecipesHasNextPage
      : recipeType === "own"
      ? selectOwnRecipesHasNextPage
      : selectFavoriteRecipesHasNextPage
  );

  const isLoading = useSelector(selectRecipesLoading);
  const isError = useSelector(selectRecipesError);
  const isFirstLoad = isLoading && page === 1;

  useEffect(() => {
    if (isMainPage) {
      dispatch(fetchByFilters(filter));
    } else {
      if (recipeType === "own") {
        dispatch(fetchOwnRecipes({ page }));
      } else if (recipeType === "favourites") {
        dispatch(fetchFavouriteRecipes({ page }));
      }
    }
  }, [dispatch, filter, page, isMainPage, recipeType]);

  const handleLoadMore = () => {
    if (isMainPage) {
      setFilter({ ...filter, page: filter.page + 1 });
    } else {
      const nextPage = page + 1;
      if (recipeType === "own") {
        dispatch(fetchOwnRecipes({ page: nextPage }));
      } else {
        dispatch(fetchFavouriteRecipes({ page: nextPage }));
      }
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
