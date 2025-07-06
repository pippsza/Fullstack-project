import { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox/SearchBox";
import Filters from "../components/Filters/Filters";
import RecipesList from "../components/RecipesList/RecipesList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";

const MainPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, ingRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/ingredients"),
        ]);
        setCategories(catRes.data);
        setIngredients(ingRes.data);
      } catch (err) {
        console.error("Error fetching filters", err);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/recipes", {
          params: {
            search,
            category,
            ingredient,
            page,
          },
        });

        if (page === 1) {
          setRecipes(res.data.recipes);
        } else {
          setRecipes((prev) => [...prev, ...res.data.recipes]);
        }

        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error("Error fetching recipes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [search, category, ingredient, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

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
