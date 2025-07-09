import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Filters from "../Filters/Filters";
import css from "./ListWrapper.module.css";
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
import { selectUserData } from "../../redux/auth/selectors";
import { getUserInfo } from "../../redux/auth/operations";

export default function ListWrapper({
  filter,
  setFilter,
  isSearched,
  isModalOpen,
}) {
  const data = useSelector(selectUserData);
  const favourites = data.favorites;
  const location = useLocation();
  const { recipeType } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(getUserInfo());
      } catch (error) {
        console.error("Ошибка получения пользователя:", error);
      }
    };
    fetch();
  }, [dispatch]);
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
  const isInitialLoad = isMainPage
    ? isLoading && filter.page === 1
    : isLoading && page === 1;

  const isLoadMore = isMainPage
    ? isLoading && filter.page > 1
    : isLoading && page > 1;
  // const isFirstLoad = isLoading && page === 1;

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
      {/* {isFirstLoad && <Loader />} */}
      {isError && <b>Whoops, there was an error pls reload...</b>}
      <Filters
        filter={filter}
        setFilter={setFilter}
        total={total}
        isSearched={isSearched}
      />
      {isInitialLoad ? (
        <div style={{ paddingTop: "200px", paddingBottom: "200px" }}>
          <Loader />
        </div>
      ) : items && items.length > 0 ? (
        <>
          <RecipesList
            favourites={favourites}
            isModalOpen={isModalOpen}
            items={items}
          />

          {hasNextPage && (
            <>
              {isLoadMore && (
                <div style={{ marginBottom: "40px" }}>
                  <Loader />
                </div>
              )}
              {!isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
            </>
          )}
        </>
      ) : (
        <p className={css.notFound}> Any recipes was found.</p>
      )}
    </>
  );
}
