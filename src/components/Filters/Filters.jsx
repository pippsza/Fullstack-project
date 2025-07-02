import { useState, useRef, useEffect } from "react";
import css from "./Filters.module.css";
import Container from "../container/container";
import Svg from "../Svg/svg";

const Filters = () => {
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
                  <select id="category" className={css.selectFilter}>
                    <option value="" default hidden>
                      Category
                    </option>
                    <option className={css.selectOpt} value="breakfast">
                      Breakfast
                    </option>
                    <option className={css.selectOpt} value="lunch">
                      Lunch
                    </option>
                    <option className={css.selectOpt} value="dinner">
                      Dinner
                    </option>
                  </select>
                  <div>
                    <select id="ingredient" className={css.selectFilter}>
                      <option value="" default hidden>
                        Ingredient
                      </option>
                      <option className={css.selectOpt} value="eggs">
                        Eggs
                      </option>
                      <option className={css.selectOpt} value="beef">
                        Beef
                      </option>
                      <option className={css.selectOpt} value="vegetables">
                        Vegetables
                      </option>
                    </select>
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
                  <Svg styles={css.svg} name={"filter"}></Svg>
                </button>

                {open && (
                  <div className={css.dropdown}>
                    <button className={css.btnReset}>Reset filters</button>
                    <div onClick={handleReset} className={css.divSelect}>
                      <select id="category" className={css.selectFilter}>
                        <option value="" default hidden>
                          Category
                        </option>
                        <option className={css.selectOpt} value="breakfast">
                          Breakfast
                        </option>
                        <option className={css.selectOpt} value="lunch">
                          Lunch
                        </option>
                        <option className={css.selectOpt} value="dinner">
                          Dinner
                        </option>
                      </select>
                      <div>
                        <select id="ingredient" className={css.selectFilter}>
                          <option value="" default hidden>
                            Ingredient
                          </option>
                          <option className={css.selectOpt} value="eggs">
                            Eggs
                          </option>
                          <option className={css.selectOpt} value="beef">
                            Beef
                          </option>
                          <option className={css.selectOpt} value="vegetables">
                            Vegetables
                          </option>
                        </select>
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
