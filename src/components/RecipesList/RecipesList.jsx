import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesList.module.css";
import { useSelector } from "react-redux";
import { selectAllRecipes } from "../../redux/recipes/selectors";

export default function RecipesList() {
  const recipes = useSelector(selectAllRecipes);

  setTimeout(() => {
    console.log("good", recipes);
  }, 2000);
  return (
    <ul className={style.list}>
      {recipes &&
        recipes.map((recipe) => (
          <li className={style.item} key={recipe._id}>
            <RecipeCard recipeCard={recipe} />
          </li>
        ))}
    </ul>
  );
}
