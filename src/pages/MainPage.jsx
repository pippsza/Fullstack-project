import { useState } from "react";
import SearchBox from "../components/SearchBox/SearchBox";
import Filters from "../components/Filters/Filters";
import ListWrapper from "../components/ListWrapper/ListWrapper";
// import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import Container from "../components/container/container";

const MainPage = () => {
  const [filter, setFilter] = useState({
    category: "",
    ingredient: "",
    title: "",
    page: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <SearchBox
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Filters
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
      <Container>
        <ListWrapper filter={filter} setFilter={setFilter} />
      </Container>

      {/* <LoadMoreBtn filter={filter} setFilter={setFilter} /> */}
    </>
  );
};

export default MainPage;
