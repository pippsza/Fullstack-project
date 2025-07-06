// import { useSelector } from "react-redux";
import css from "./RecipeIngredientsList.module.css";

export default function RecipeIngredientsList({ ingredients }) {
  // const allIngredients = useSelector(selectIngredientsList);
  const allIngredients = ingredients;
  console.log("allIngr:", allIngredients);
  return (
    <div className={css.ingredientsBox}>
      <h3 className={css.ingredientsTitle}>Ingredients:</h3>
      <ul className={css.ingredientsList}>
        {ingredients.map(({ id, measure }) => {
          const found = allIngredients.find(
            (ingredient) => ingredient.id === id
          );
          return (
            <li className={css.ingredientsItem} key={id}>
              {found?.name || "Unknown"} - {measure}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
