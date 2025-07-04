import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import css from "./AddRecipeForm.module.css";

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
    setIsSubmitted(true);
    reset();
  };
    

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
              {...register("title", {
                required: "is required",
              })}
            />
            {errors.recipeTitle && (
              <span className={css.error}>{errors.recipeTitle.message}</span>
            )}
          </div>
          <div>
            <p className={css.formList}>Recipe Description</p>
            <textarea
              className={css.textarea}
              placeholder="Enter a brief description of your recipe"
              {...register("description", {
                required: "is required",
              })}
            />
            {errors.recipeDescription && (
              <span className={css.error}>
                {errors.recipeDescription.message}
              </span>
            )}
          </div>
          <div>
            <p className={css.formList}>Cooking time in minutes</p>
            <input
              className={css.formInput}
              type="number"
              placeholder="10"
              {...register("time")}
            />
          </div>
          <div className={css.cookingSection}>
            <div className={css.selectContainer}>
              <p className={css.formList}>Calories</p>
              <input
                className={css.formInput}
                type="number"
                placeholder="150 cals"
                {...register("calories")}
              />
            </div>
            <div className={css.selectContainer}>
              <p className={css.formList}>Category</p>
              <select className={css.formInput} {...register("category")}>
                <option value="1">Soup</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h3 className={css.sectionTitle}>Ingredients</h3>
          <p className={css.formList}>Name</p>
          <input
            className={css.formInput}
            placeholder="Ingredient title"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <p className={css.formList}>Amount</p>
          <select
            className={css.formInput}
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          >
            <option value="">Select amount</option>
            <option value="100g">100g</option>
            <option value="200g">200g</option>
            <option value="1 piece">1 piece</option>
          </select>
          <button
            className={css.button}
            type="button"
            onClick={handleAddIngredient}
            disabled={isSubmitted}
          >
            Add new ingredient
          </button>
          {ingredientFields.map((field, index) => (
            <div key={field.id} className={css.ingredientRow}>
              <span>
                {field.ingredient}
                {field.measure}
              </span>
              {!isSubmitted && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove
                </button>
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
              required: "is required",
            })}
          />
          {errors.instructions && (
            <span className={css.error}>{errors.instructions.message}</span>
          )}
        </div>
      </div>
      <div className={css.bntContainer}>
        <button className={css.button} type="submit">
          Publish Recipe
        </button>
      </div>
    </form>
  );
}
