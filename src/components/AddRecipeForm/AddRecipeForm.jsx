import { useForm } from "react-hook-form";
import IngredientList from "./IngredientList/IngredientList";
import css from "./AddRecipeForm.module.css";

const dishes = [
  "Борщ",
  "Піцца Маргарита",
  "Суші",
  "Тако",
  "Бургер",
  "Хумус",
  "Курячі крильця Баффало",
  "Кіші",
  "Паста Карбонара",
  "Шашлик",
];

export default function AddRecipeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className={css.formTitle}>Add Recipe</h2>
      </div>
      <div className={css.formSection}>
        <h3 className={css.sectionTitle}>Upload Photo</h3>
        <div className={css.generalContainer}>
          <div>
            <h3 className={css.sectionTitle}>General Information</h3>
            <p className={css.formList}> Recipe Title </p>
            <input
              className={css.formInput}
              type="text"
              placeholder="Enter the name of your recipe"
              {...register}
            />
          </div>
          <div>
            <p className={css.formList}>Recipe Description</p>
            <textarea
              className={css.textarea}
              type="text"
              placeholder="Enter a brief description of your recipe"
              {...register}
            />
          </div>
          <div>
            <p className={css.formList}>Cooking time in minutes</p>
            <input
              className={css.formInput}
              type="number"
              placeholder="10"
              {...register}
            />
          </div>
          <div className={css.cookingSection}>
            <div className={css.selectContainer}>
              <p className={css.formList}>Calories</p>
              <input
                className={css.formInput}
                type="number"
                placeholder="150 cals"
                {...register}
              />
            </div>
            <div className={css.selectContainer}>
              <p className={css.formList}>Category</p>
              <select className={css.formInput} {...register("Category")}>
                <option >Soup</option>
                {dishes.map((dishe, index) => (
                  <option key={index} value={dishe}>
                    {dishe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <h3 className={css.sectionTitle}>Ingredients</h3>
          <IngredientList />
        </div>
        <div>
          <h3 className={css.sectionTitle}>Instructions</h3>
          <textarea
            className={css.textarea}
            type="text"
            placeholder="Enter a instruction"
            {...register}
          />
        </div>
      </div>
      <button className={css.button} type="submit">
        Publish Recipe
      </button>
    </form>
  );
}
