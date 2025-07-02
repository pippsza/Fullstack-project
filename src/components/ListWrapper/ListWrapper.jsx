import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ListWrapper.module.css";
import RecipeList from "../../components/RecipesList/recipes.json";

export default function ListWrapper() {
  return (
    <>
      <p className={style.totalRecipes}>
        {RecipeList.length > 0 ? RecipeList.length : 0} recipes
      </p>
      <RecipesList />
      <LoadMoreBtn />
    </>
  );
}
