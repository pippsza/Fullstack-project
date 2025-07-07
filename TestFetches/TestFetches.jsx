import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchById,
  fetchByPages,
  addRecipe,
  fetchOwnRecipes,
  fetchFavouriteRecipes,
  deleteFavouriteRecipe,
  addFavouriteRecipe,
} from "../src/redux/recipes/operations.js";
import { selectAllRecipes } from "../src/redux/recipes/selectors";

export default function TestFetches() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);

  const handleFetch = () => {
    dispatch(fetchByPages({ page, perPage: 2 }));
    setPage((prev) => prev + 1);
  };

  const handleFetchById = () => {
    dispatch(fetchById("6462a8f74c3d0ddd28897fcd"));
  };

  const handleAddRecipe = () => {
    const formData = new FormData();
    formData.append("title", "test");
    formData.append("time", "123");
    formData.append("category", "test");
    formData.append("description", "test");
    formData.append("instructions", "test");
    formData.append("ingredients[0][id]", "640c2dd963a319ea671e366c");
    formData.append("ingredients[0][measure]", "4-5 pound");
    // Замените на реальный файл, если он обязателен
    // formData.append("file", yourFileObject);

    dispatch(addRecipe(formData));
  };

  const handleFetchOwn = () => {
    dispatch(fetchOwnRecipes());
  };

  const handleFetchFavorite = () => {
    dispatch(fetchFavouriteRecipes());
  };

  const handleDeleteFavorite = () => {
    dispatch(deleteFavouriteRecipe("6462a8f74c3d0ddd28898054"));
  };

  const handleAddFavorite = (id) => {
    dispatch(addFavouriteRecipe(id));
  };

  const handleFetchByFilters = async () => {
    try {
      const result = await dispatch(
        fetchByPages({
          page: 1,
          perPage: 5,
          ingredient: "640c2dd963a319ea671e36d2",
          category: "Chicken",
        })
      ).unwrap();
      console.log("Результат:", result);
    } catch (err) {
      console.error("Ошибка при фильтрации:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <button onClick={handleFetch}>Fetch by pages</button>
        <button onClick={handleFetchById}>Fetch by ID</button>
        <button onClick={handleAddRecipe}>Add recipe</button>
        <button onClick={handleFetchOwn}>Fetch own</button>
        <button onClick={handleFetchFavorite}>Fetch favorites</button>
        <button onClick={handleDeleteFavorite}>Delete favorite (test)</button>
        <button onClick={handleFetchByFilters}>
          Fetch data by filters (test)
        </button>
      </div>
      <div>
        <h3>All Recipes (allItems):</h3>
        {allRecipes && allRecipes.length > 0 ? (
          <ul>
            {allRecipes.map((recipe) => (
              <li key={recipe._id} style={{ marginBottom: "10px" }}>
                {recipe.title} (ID: {recipe._id})
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleAddFavorite(recipe._id)}
                >
                  Add to Favorites
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>No recipes loaded.</div>
        )}
      </div>
    </div>
  );
}
