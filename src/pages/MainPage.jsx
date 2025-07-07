import { useState } from "react";
import SearchBox from "../components/SearchBox/SearchBox";
import Filters from "../components/Filters/Filters";
import RecipesList from "../components/RecipesList/RecipesList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

const MainPage = () => {
  const [filter, setFilter] = useState({
    category: "",
    ingredient: "",
    title: "",
    page: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <SearchBox
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Filters
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
      <RecipesList />
      <LoadMoreBtn filter={filter} setFilter={setFilter} />
    </>
  );
};

export default MainPage;
