import RecipesList from "../RecipesList/RecipesList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import style from "./ListWrapper.module.css";

export default function ListWrapper() {
  return (
    <>
      <p className={style.totalRecipes}>total recipes number</p>
      <RecipesList />
      <LoadMoreBtn />
    </>
  );
}
