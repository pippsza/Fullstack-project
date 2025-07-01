// import React from "react";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
        <div className={css.searchDiv}>
          <input
            type="text"
            className={css.input}
            placeholder="Search recipes"
          />
          <button className={css.btnSearch}>Search</button>
        </div>
      </div>
    </section>
  );
};

export default SearchBox;
