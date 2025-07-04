import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import css from "./AddRecipeForm.module.css";
import Svg from "../Svg/svg.jsx";
import noImage from "../../assets/NoImageAvailable.jpg";

export default function AddRecipeForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      time: "",
      calories: "",
      category: "Soup",
      ingredients: [],
      instructions: "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const [ingredient, setIngredient] = useState("");
  const [measure, setMeasure] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddIngredient = () => {
    if (ingredient.trim() && measure.trim()) {
      appendIngredient({ ingredient, measure });
      setIngredient("");
      setMeasure("");
    }
  };

  const onSubmit = (data) => {
    console.log("Зібрані дані:", data);
    setIsSubmitted(false);
    reset();
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formTitleContainer}>
        <h2 className={css.formTitle}>Add Recipe</h2>
      </div>
      <div className={css.formSection}>
        <div>
          <h3 className={css.sectionTitle}>Upload Photo</h3>
          <img src={noImage} className={css.noImage} alt="No Image" />
        </div>
        <div className={css.generalContainer}>
          <div>
            <h3 className={css.sectionTitle}>General Information</h3>
            <p className={css.formList}> Recipe Title </p>
            <input
              className={css.formInput}
              type="text"
              placeholder="Enter the name of your recipe"
              {...register("title", {
                required: "required field",
              })}
            />
            {errors.title && (
              <span className={css.error}>{errors.title.message}</span>
            )}
          </div>
          <div>
            <p className={css.formList}>Recipe Description</p>
            <textarea
              className={css.textarea}
              placeholder="Enter a brief description of your recipe"
              {...register("description", {
                required: "required field",
              })}
            />
            {errors.description && (
              <span className={css.error}>{errors.description.message}</span>
            )}
          </div>
          <div>
            <p className={css.formList}>Cooking time in minutes</p>
            <input
              className={css.formInput}
              type="number"
              placeholder="10"
              {...register("time", {
                required: "required field",
              })}
            />
            {errors.time && (
              <span className={css.error}>{errors.time.message}</span>
            )}
          </div>
          <div className={css.cookingSection}>
            <div className={css.selectContainer}>
              <p className={css.formList}>Calories</p>
              <input
                className={css.formInput}
                type="number"
                placeholder="150 cals"
                {...register("calories", {
                  required: "required field",
                })}
              />
              {errors.calories && (
                <span className={css.error}>{errors.calories.message}</span>
              )}
            </div>
            <div className={css.selectContainer}>
              <p className={css.formList}>Category</p>
              <select
                className={css.formInput}
                {...register("category", {
                  required: "required field",
                })}
              >
                <option value="1">Soup</option>
              </select>
              {errors.category && (
                <span className={css.error}>{errors.category.message}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className={css.sectionTitle}>Ingredients</h3>
          <div className={`${css.generalContainer} ${css.tabletContainer}`}>
            <div className={`${css.formListConasiner} ${css.formListTablet}`}>
              <p className={css.formList}>Name</p>
              <input
                className={`${css.formInput} ${css.formTablet}`}
                placeholder="Broccoli"
                value={ingredient}
                onChange={(event) => setIngredient(event.target.value)}
              />
            </div>
            <div className={`${css.formListConasiner} ${css.formListTablet}`}>
              <p className={css.formList}>Amount</p>
              <input
                className={`${css.formInput} ${css.formInputTablet}`}
                placeholder="100g"
                value={measure}
                onChange={(event) => setMeasure(event.target.value)}
              />
            </div>
          </div>
          <button
            className={`${css.button} ${css.addButton}`}
            type="button"
            onClick={handleAddIngredient}
            disabled={isSubmitted}
          >
            Add new ingredient
          </button>

          {ingredientFields.map((field, index) => (
            <div key={field.id} className={css.ingredientRow}>
              <span className={css.spanIngredient}>{field.ingredient}</span>
              <span className={css.spanIngredient}>{field.measure}</span>
              {!isSubmitted && (
                <Svg
                  name={"trash"}
                  styles={css.spanIcon}
                  onClick={() => removeIngredient(index)}
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <h3 className={css.sectionTitle}>Instructions</h3>
          <textarea
            className={css.textarea}
            placeholder="Enter instructions"
            {...register("instructions", {
              required: "required field",
            })}
          />
          {errors.instructions && (
            <span className={css.error}>{errors.instructions.message}</span>
          )}
        </div>
        <div className={css.bntContainer}>
          <button className={css.button} type="submit">
            Publish Recipe
          </button>
        </div>
      </div>
    </form>
  );
}
