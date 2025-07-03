import React from "react";
import Container from "../components/container/container";
import SearchBox from "../components/SearchBox/SearchBox";
import Filters from "../components/Filters/Filters";
// import RecipeList from "../components";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm.jsx";

const MainPage = () => {
  return (
    <>
      <AddRecipeForm />
      <SearchBox />
      <Filters />
      {/* <RecipeList /> */}
    </>
  );
};

export default MainPage;
