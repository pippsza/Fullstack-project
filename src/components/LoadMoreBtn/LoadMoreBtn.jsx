import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = () => {
  return (
    <div className={css.divBtn}>
      <button className={css.btn}>Load More</button>
    </div>
  );
};

export default LoadMoreBtn;
