import RecipeCard from "../RecipeCard/RecipeCard";
import recipeCards from "./recipes.json";
import style from "./RecipesList.module.css";

export default function RecipesList({ items = recipeCards }) {
  return (
    <ul className={style.list}>
      {recipeCards.map((recipeCard) => (
        <li className={style.item} key={recipeCard._id.$oid}>
          <RecipeCard recipeCard={recipeCard} />
        </li>
      ))}
    </ul>
  );
}
