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
  const [ingredientNameError, setIngredientNameError] = useState("");
  const [ingredientAmountError, setIngredientAmountError] = useState("");

  const handleAddIngredient = () => {
    let hasError = false;
    if (!ingredient.trim()) {
      setIngredientNameError("Required field!");
      hasError = true;
    } else {
      setIngredientNameError("");
    }
    if (!measure.trim()) {
      setIngredientAmountError("Required field!");
      hasError = true;
    } else {
      setIngredientAmountError("");
    }
    if (hasError) return;

    appendIngredient({ ingredient, measure });
    setIngredient("");
    setMeasure("");
  };

  const onSubmit = (data) => {
    console.log("Зібрані дані:", data);
    setIsSubmitted(false);
    reset();
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.formTitle}>Add Recipe</h2>
      <div className={css.mainRowContainer}>
        <section className={css.sectionPhoto}>
          <h3 className={css.sectionTitlePhoto}>Upload Photo</h3>
          <img src={noImage} className={css.noImage} alt="No Image" />
        </section>
        <div className={css.globalContainer}>
          <section className={css.sectionInformation}>
            <h3 className={css.sectionTitle}>General Information</h3>
            <div className={css.recipeParts}>
              <div className={css.recipeTitle}>
                <p className={css.titleText}> Recipe Title </p>
                <input
                  className={`${css.formInput} ${errors.title ? css.err : ""}`}
                  type="text"
                  placeholder="Enter the name of your recipe"
                  {...register("title", {
                    required: "Required field!",
                  })}
                />
                {errors.title && (
                  <span className={css.error}>{errors.title.message}</span>
                )}
              </div>
              <div className={css.recipeDescription}>
                <p className={css.titleText}>Recipe Description</p>
                <textarea
                  className={`${css.textarea} ${
                    errors.description ? css.err : ""
                  }`}
                  placeholder="Enter a brief description of your recipe"
                  {...register("description", {
                    required: "Required field!!",
                  })}
                />
                {errors.description && (
                  <span className={css.error}>
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className={css.recipeCooking}>
                <p className={css.titleText}>Cooking time in minutes</p>
                <input
                  className={`${css.formInput} ${errors.time ? css.err : ""}`}
                  type="number"
                  placeholder="10"
                  {...register("time", {
                    required: "Required field!",
                  })}
                />
                {errors.time && (
                  <span className={css.error}>{errors.time.message}</span>
                )}
              </div>
              <div className={css.recipeCalories}>
                <div className={css.caloriesPart}>
                  <p className={css.titleText}>Calories</p>
                  <input
                    className={`${css.formInput} ${
                      errors.calories ? css.err : ""
                    }`}
                    type="number"
                    placeholder="150 cals"
                    {...register("calories", {
                      required: "Required field!",
                    })}
                  />
                  {errors.calories && (
                    <span className={css.error}>{errors.calories.message}</span>
                  )}
                </div>
                <div className={css.categoryPart}>
                  <p className={css.titleText}>Category</p>
                  <select
                    className={`${css.formInput} ${
                      errors.category ? css.err : ""
                    }`}
                    {...register("category", {
                      required: "Required field!",
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
          </section>

          <section className={css.sectionIngredients}>
            <h3 className={css.sectionTitle}>Ingredients</h3>
            <div className={css.titleParts}>
              <div className={css.titlePartsItem}>
                <div className={css.itemName}>
                  <p className={css.titleText}>Name</p>
                  <input
                    className={`${css.formInput} ${
                      ingredientNameError ? css.err : ""
                    }`}
                    placeholder="Broccoli"
                    value={ingredient}
                    onChange={(event) => setIngredient(event.target.value)}
                  />
                  {ingredientNameError && (
                    <span className={css.error}>{ingredientNameError}</span>
                  )}
                </div>
                <div className={css.itemAmuont}>
                  <p className={css.titleText}>Amount</p>
                  <input
                    className={`${css.formInput} ${
                      ingredientAmountError ? css.err : ""
                    }`}
                    placeholder="100g"
                    value={measure}
                    onChange={(event) => setMeasure(event.target.value)}
                  />
                  {ingredientAmountError && (
                    <span className={css.error}>{ingredientAmountError}</span>
                  )}
                </div>
              </div>
              <div className={css.addBtn}>
                <button
                  className={`${css.button} ${css.addButton}`}
                  type="button"
                  onClick={handleAddIngredient}
                  disabled={isSubmitted}
                >
                  Add new ingredient
                </button>
              </div>
              <div className={css.addFieldForm}>
                <div
                  className={
                    ingredientFields.length > 0
                      ? css.statusVisible
                      : css.statusInvisible
                  }
                >
                  <p className={css.spanIngredientItem}>Name:</p>
                  <p className={css.spanMeasureItem}>Amount:</p>
                </div>

                {ingredientFields.map((field, index) => (
                  <div key={field.id} className={css.ingredientRow}>
                    <span className={css.spanIngredient}>
                      {field.ingredient}
                    </span>
                    <span className={css.spanMeasure}>{field.measure}</span>
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
            </div>
          </section>
          <section className={css.sectionInstructions}>
            <div>
              <h3 className={css.sectionTitle}>Instructions</h3>
              <textarea
                className={`${css.textarea} ${
                  errors.instructions ? css.err : ""
                }`}
                placeholder="Enter instructions"
                {...register("instructions", {
                  required: "Required field!",
                })}
              />
              {errors.instructions && (
                <span className={css.error}>{errors.instructions.message}</span>
              )}
            </div>
          </section>
          <div className={css.bntContainer}>
            <button className={css.button} type="submit">
              Publish Recipe
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
