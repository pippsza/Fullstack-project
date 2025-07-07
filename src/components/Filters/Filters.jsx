import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import Container from "../container/container";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import Svg from "../Svg/svg";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchByFilters } from "../../redux/recipes/operations.js";
import { selectFilteredRecipesTotal } from "../../redux/recipes/selectors.js";

const Filters = ({ filter, setFilter, setSearchQuery }) => {
  const dispatch = useDispatch();
  const totalCountRecipes = useSelector(selectFilteredRecipesTotal);
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [size, setSize] = useState(window.innerWidth);
  const sizeDesktop = 1439;

  useEffect(() => {
    const resizeHandler = () => setSize(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const tag = target.tagName?.toLowerCase();
      if (["select", "option", "svg", "path"].includes(tag)) return;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (value) => {
    setFilter({ ...filter, category: value.name, page: 1 });
  };

  const handleIngredientChange = (value) => {
    setFilter({ ...filter, ingredient: value._id, page: 1 });
    console.log("in", value._id);
  };

  useEffect(() => {
    dispatch(fetchByFilters(filter));
  }, [filter]);

  const handleReset = () => {
    setFilter({
      category: "",
      ingredient: "",
      title: "",
      page: 1,
    });
    setSearchQuery("");
    setOpen(false);
  };

  return (
    <section>
      <Container>
        <div className={css.container}>
          <h2 className={css.title}>Recepies</h2>
          <div className={css.divFilters}>
            <p className={css.count}>{totalCountRecipes} recipes</p>
            {size > sizeDesktop ? (
              <div className={css.dropdown}>
                <button onClick={handleReset} className={css.btnReset}>
                  Reset filters
                </button>
                <div className={css.divSelect}>
                  <CustomSelect
                    label="Category"
                    options={categories}
                    selected={filter.category}
                    onChange={handleCategoryChange}
                  />
                  <CustomSelect
                    label="Ingredient"
                    options={ingredients}
                    selected={
                      ingredients.find((item) => item._id === filter.ingredient)
                        ?.name || ""
                    }
                    onChange={handleIngredientChange}
                  />
                </div>
              </div>
            ) : (
              <div className={css.divDropdown} ref={containerRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className={css.btnDropdown}
                >
                  Filters
                  <Svg styles={css.svg} name={"filter"} />
                </button>

                {open && (
                  <div className={css.dropdown}>
                    <button onClick={handleReset} className={css.btnReset}>
                      Reset filters
                    </button>
                    <div className={css.divSelect}>
                      <CustomSelect
                        label="Category"
                        options={categories}
                        selected={filter.category}
                        onChange={handleCategoryChange}
                      />
                      <CustomSelect
                        label="Ingredient"
                        options={ingredients}
                        selected={
                          ingredients.find(
                            (item) => item._id === filter.ingredient
                          )?.name || ""
                        }
                        onChange={handleIngredientChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Filters;
