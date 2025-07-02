// import React from "react";
import Container from "../container/container";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.searchDiv}>
          <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
          <div className={css.inputDiv}>
            <input
              type="text"
              className={css.input}
              placeholder="Search recipes"
            />
            <button className={css.btnSearch}>Search</button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchBox;
