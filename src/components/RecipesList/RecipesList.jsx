import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesList.module.css";
import { useSelector } from "react-redux";

export default function RecipesList() {
  const recipes = useSelector((state) => state.recipes.items.allItems.items);
  console.log("good", recipes);

  return (
    <ul className={style.list}>
      {recipes &&
        recipes.map((recipe) => (
          <li className={style.item} key={recipe._id.$oid || recipe._id}>
            <RecipeCard recipeCard={recipe} />
          </li>
        ))}
    </ul>
  );
}
