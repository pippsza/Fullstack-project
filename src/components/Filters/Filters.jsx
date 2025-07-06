import { useState, useRef, useEffect } from "react";
import css from "./Filters.module.css";
import Container from "../container/container";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import Svg from "../Svg/svg";

const Filters = () => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [size, setSize] = useState(window.innerWidth);

  const sizeDesktop = 1439;

  useEffect(() => {
    // Тут ти заміниш на API-запит
    setCategories(["Breakfast", "Lunch", "Dinner"]);
    setIngredients(["Eggs", "Beef", "Vegetables"]);
  }, []);

  useEffect(() => {
    const resizeHandler = () => setSize(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
    console.log("Reset filters");
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
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                  <CustomSelect
                    label="Ingredient"
                    options={ingredients}
                    selected={selectedIngredient}
                    onChange={setSelectedIngredient}
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
                  <Svg styles={css.svg} name={"filter"}></Svg>
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
                        selected={selectedCategory}
                        onChange={setSelectedCategory}
                      />
                      <CustomSelect
                        label="Ingredient"
                        options={ingredients}
                        selected={selectedIngredient}
                        onChange={setSelectedIngredient}
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
