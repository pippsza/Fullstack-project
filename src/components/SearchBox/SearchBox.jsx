import Container from "../container/container";
import css from "./SearchBox.module.css";

const SearchBox = ({ filter, setFilter, searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setFilter({ ...filter, title: searchQuery, page: 1 });
    console.log(searchQuery);
  };

  return (
    <section className={css.section}>
      <Container>
        <div className={css.searchDiv}>
          <h1 className={css.title}>Plan, Cook, and Share Your Flavors</h1>
          <div className={css.inputDiv}>
            <input
              type="text"
              value={searchQuery}
              className={css.input}
              placeholder="Search recipes"
              onChange={handleSearchChange}
            />
            <button className={css.btnSearch} onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchBox;
