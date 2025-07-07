import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesList.module.css";
import { useSelector } from "react-redux";
import { selectFilteredRecipes } from "../../redux/recipes/selectors";
import Container from "../container/container";

export default function RecipesList() {
  const recipes = useSelector(selectFilteredRecipes);

  return (
    <Container>
      <ul className={style.list}>
        {recipes &&
          recipes.map((recipe) => (
            <li className={style.item} key={recipe._id}>
              <RecipeCard recipeCard={recipe} />
            </li>
          ))}
      </ul>
    </Container>
  );
}
