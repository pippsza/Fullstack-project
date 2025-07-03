import { useState } from "react";
import css from './IngredientList.module.css'

export default function IngredientList() {
  const ingredients = ["Помідор", "Огірок", "Майонез", "Сіль", "Цукор"];

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredient = () => {
    if (selectedIngredient && quantity > 0) {
      const existingIndex = ingredientsList.findIndex(
        (item) => item.name === selectedIngredient
      );

      if (existingIndex >= 0) {
        const updatedList = [...ingredientsList];
        updatedList[existingIndex].quantity += quantity;
        setIngredientsList(updatedList);
      } else {
        setIngredientsList([
          ...ingredientsList,
          { name: selectedIngredient, quantity },
        ]);
      }
    }
  };

  const removeIngredient = (name) => {
    setIngredientsList(ingredientsList.filter((item) => item.name !== name));
  };

  return (
    <div>
      <p className={css.formList}>Ingredient</p>
      <select
        className={css.formInput}
        value={selectedIngredient}
        onChange={(event) => setSelectedIngredient(event.target.value)}
      >
        <option value="" disabled>
          Select ingredient
        </option>
        {ingredients.map((ingredient, index) => (
          <option key={index} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
      <p className={css.formList}>Amount</p>
      <input
        className={css.formInput}
        type="number"
        value={quantity}
        onChange={(event) => setQuantity(parseInt(event.target.value))}
      />

      <button className={css.button} onClick={addIngredient}>
        Add new Ingredient
      </button>

      <ul>
        {ingredientsList.map((item, index) => (
          <li key={index}>
            <span>
              {item.name} — {item.quantity}
            </span>
            <button onClick={() => removeIngredient(item.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
