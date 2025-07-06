import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import Container from "../container/container";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import Svg from "../Svg/svg";
import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchByPages } from "../../redux/recipes/operations.js";

const Filters = () => {
  const dispatch = useDispatch();
  const initValuesDispatch = {
    category: "",
    ingredient: "",
    title: "",
    page: 1,
  };
  // dispatch(fetchByPages(initValuesDispatch));
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const [ingredientInput, setIngredientInput] = useState("");
  const filteredIngredients = ingredients.filter((ingr) =>
    ingr.name.toLowerCase().includes(ingredientInput.toLowerCase())
  );

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

  const handleCategoryChange = (e) => {
    // dispatch(selectCategory(e.target.value));
  };

  const handleIngredientChange = (value) => {
    // const value = e.target.value;
    console.log(value);
    // dispatch(selectIngredient(value));
    // setIngredientInput(value);
  };

  const handleReset = () => {
    // dispatch(resetFilters());
    setIngredientInput("");
    setOpen(false);
  };

  return (
    <section>
      <Container>
        <div className={css.container}>
          <h2 className={css.title}>Recepies</h2>
          <div className={css.divFilters}>
            <p className={css.count}>96 recipes</p>
            {size > sizeDesktop ? (
              <div className={css.dropdown}>
                <button onClick={handleReset} className={css.btnReset}>
                  Reset filters
                </button>
                <div className={css.divSelect}>
                  <CustomSelect
                    label="Category"
                    options={categories}
                    selected={null}
                    onChange={handleCategoryChange}
                  />
                  <CustomSelect
                    label="Ingredient"
                    options={ingredients}
                    selected={null}
                    onChange={handleIngredientChange}
                  />
                  <select
                    id="category"
                    className={css.selectFilter}
                    value={null}
                    onChange={handleCategoryChange}
                  >
                    <option value="" disabled hidden>
                      Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div>
                    <input
                      list="ingredients"
                      className={css.selectFilter}
                      placeholder="Ingredient"
                      value={ingredientInput}
                      onChange={handleIngredientChange}
                    />
                    <datalist id="ingredients">
                      {filteredIngredients.map((ingr) => (
                        <option key={ingr._id} value={ingr.name} />
                      ))}
                    </datalist>
                  </div>
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
                        selected={null}
                        onChange={handleCategoryChange}
                      />
                      <CustomSelect
                        label="Ingredient"
                        options={ingredients}
                        selected={null}
                        onChange={handleIngredientChange}
                      />
                      <select
                        id="category"
                        className={css.selectFilter}
                        value={null}
                        onChange={handleCategoryChange}
                      >
                        <option value="" disabled hidden>
                          Category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div>
                        <input
                          list="ingredients"
                          className={css.selectFilter}
                          placeholder="Ingredient"
                          value={ingredientInput}
                          onChange={handleIngredientChange}
                        />
                        <datalist id="ingredients">
                          {filteredIngredients.map((ingr) => (
                            <option key={ingr._id} value={ingr.name} />
                          ))}
                        </datalist>
                      </div>
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
