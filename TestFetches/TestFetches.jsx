import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchById,
  fetchByPages,
  addRecipe,
} from "../src/redux/recipes/operations.js";

export default function TestFetches() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [data, setData] = useState();
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
        userId: "6462a8f74c3d0ddd28897fcd",
        title: "test",
        category: "test",
        ingredients: ["test"],
        description: "test",
        instructions: "test",
        file: "test",
        photo: "test",
      })
    );
  };
  console.log("work!");
  return (
    <>
      <button onClick={handleFetch}>Fetch by pages</button>
      <button onClick={handleFetchById}>Fetch by id</button>
      <button onClick={handleAddRecipe}>Add recipe</button>
    </>
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
