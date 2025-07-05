import RecipeCard from "../RecipeCard/RecipeCard";
// import recipeCards from "./recipes.json";
import style from "./RecipesList.module.css";

export default function RecipesList({ recipes }) {
  return (
    <ul className={style.list}>
      {recipes.map((recipeCard) => (
        <li className={style.item} key={recipeCard._id.$oid}>
          <RecipeCard recipeCard={recipeCard} />
        </li>
      ))}
    </ul>
  );
}
