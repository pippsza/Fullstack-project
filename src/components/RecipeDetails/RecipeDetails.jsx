import css from "./RecipeDetails.module.css";
import GeneralInfoRecipe from "../GeneralInfoRecipe/GeneralInfoRecipe";
import AboutRecipe from "../AboutRecipe/AboutRecipe";
import PreparationRecipe from "../PreparationRecipe/PreparationRecipe";
import RecipeIngredientsList from "../RecipeIngredientsList/RecipeIngredientsList";

export default function RecipeDetails({ recipe }) {
  const {
    title,
    thumb,
    category,
    time,
    calories,
    description,
    ingredients,
    instructions,
  } = recipe;

  return (
    <section className={css.recipeSection}>
      <div className={css.container}>
        <div className={css.imageBox}>
          <h2 className={css.mainRecipeTitle}>{title}</h2>
          <img
            className={css.recipeImage}
            src={thumb}
            alt={`Photo of ${title}`}
          />
        </div>
        <div className={css.flexBox}>
          <div className={css.generalInfo}>
            <GeneralInfoRecipe
              category={category}
              time={time}
              calories={calories}
            />
          </div>
          <div className={css.aboutBox}>
            <AboutRecipe description={description} />
            <RecipeIngredientsList ingredients={ingredients} />
            <PreparationRecipe instructions={instructions} />
          </div>
        </div>
      </div>
    </section>
  );
}
