import SearchBox from "../components/SearchBox/SearchBox";
import Filters from "../components/Filters/Filters";
import RecipesList from "../components/RecipesList/RecipesList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

const MainPage = () => {
  return (
    <>
      <SearchBox />
      <Filters />
      <RecipesList />
      <LoadMoreBtn />
    </>
  );
};

export default MainPage;
