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
  const [data, setData] = useState();
  const allRecipes = useSelector(selectAllRecipes);

  const handleFetch = () => {
    setPage(page + 1);
    dispatch(fetchByPages({ page: page, perPage: 2 }));
  };
  const handleFetchById = () => {
    dispatch(fetchById("6462a8f74c3d0ddd28897fcd"));
  };
  const handleAddRecipe = () => {
    dispatch(
      addRecipe({
        title: "test",
        time: "123",
        category: "test",
        ingredients: [
          {
            id: "640c2dd963a319ea671e366c",
            measure: "4-5 pound",
          },
        ],
        description: "test",
        instructions: "test",
      })
    );
  };
  const handleFetchOwn = () => {
    dispatch(fetchOwnRecipes({}));
  };
  const handlefetchFavorite = () => {
    dispatch(fetchFavouriteRecipes({}));
  };
  const handleDeleteFavorite = () => {
    dispatch(deleteFavouriteRecipe("6462a8f74c3d0ddd28898054"));
  };
  const handleAddFavorite = (id) => {
    dispatch(addFavouriteRecipe(id));
  };

  console.log("work!");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        <button onClick={handleFetch}>Fetch by pages</button>
        <button onClick={handleFetchById}>Fetch by id</button>
        <button onClick={handleAddRecipe}>Add recipe</button>
        <button onClick={handleFetchOwn}>fetch own</button>
        <button onClick={handlefetchFavorite}>fetch favorites</button>
        <button onClick={handleDeleteFavorite}>Delete favorite (test)</button>
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
// userId *
// string

// Recipe ID
// title *
// string

// The full name of the recipe
// category *
// string

// The full name of the category
// ingredients *
// array<string>

// List of recipe ingredients
// description *
// string

// The full name of the description
// instructions *
// string

// The full name of the preparation steps
// file *
// string($binary)

// Recipe's photo
