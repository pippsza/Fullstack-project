import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ListWrapper.module.css";
import RecipeList from "../../components/RecipesList/recipes.json";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectFavourites, selectHasNextPage } from "../../redux/recipes/selectors";
import { fetchFavourites, fetchOwn } from "../../redux/recipes/operations";
import { useParams } from "react-router-dom";

export default function ListWrapper() {
  const { recipeType } = useParams();
  const isLoading=useSelector(selectLoading)
    const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const recipes = useSelector(selectFavourites); 
  
  const hasNextPage = useSelector(selectHasNextPage); 
  useEffect(() => {
    if (recipeType === "own") {
      dispatch(fetchOwn(page));
    } else if (recipeType === "favourites") {
      dispatch(fetchFavourites(page));
    }
  }, [page, recipeType, dispatch]);

  
  // const [recipes, setRecipes] = useState([])
  // const [page, setPage] = useState(1);
  // useEffect(() => {
  //   if (!RecipeList) {
  //     return
  //   };
  //   const PAGE_SIZE = 12;
  //   const start = (page - 1) * PAGE_SIZE;
  //   const end = start + PAGE_SIZE;
  //   const newItems = RecipeList.slice(start, end);
  //   setRecipes((prevRecipes) => { return [...prevRecipes, ...newItems] });
  // }, [page]);
  console.log(recipes)
  return (
    <>
      <p className={style.totalRecipes}>
        {recipes?.length > 0 ? recipes.length : 0} recipes
      </p>
      {recipes && <RecipesList recipes={recipes} />}
      {hasNextPage && !isLoading &&  <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)}/>}
    </>
  );
}
