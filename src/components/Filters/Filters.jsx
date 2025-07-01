import { useState, useRef, useEffect } from "react";
import css from "./Filters.module.css";
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

  return (
    <div className={css.container}>
      <h2 className={css.title}>Recepies</h2>
      <div className={css.divFilters}>
        <p className={css.count}>96 recipes</p>
        {size > sizeDesktop ? (
          <div className={css.dropdown}>
            <button className={css.btnReset}>Reset filters</button>
            <div className={css.divSelect}>
              <div className="mb-4">
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
              </div>
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
            <button onClick={() => setOpen(!open)} className={css.btnDropdown}>
              Filters
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.68117 0.820312L13.3188 0.82032C14.1092 0.820321 14.75 1.46107 14.75 2.25148C14.75 2.6168 14.6103 2.96829 14.3595 3.23394L9.55769 8.32031L9.55769 11.8415C9.55769 12.9893 8.35844 13.7429 7.32425 13.2449C6.7851 12.9854 6.44231 12.4399 6.44231 11.8415L6.44231 8.32031L1.64049 3.23394C1.3897 2.96829 1.25 2.6168 1.25 2.25148C1.25 1.46107 1.89076 0.820312 2.68117 0.820312Z"
                  stroke="black"
                />
              </svg>
            </button>

            {open && (
              <div className={css.dropdown}>
                <button className={css.btnReset}>Reset filters</button>
                <div className={css.divSelect}>
                  <div className="mb-4">
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
                  </div>
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
  );
};

export default Filters;
