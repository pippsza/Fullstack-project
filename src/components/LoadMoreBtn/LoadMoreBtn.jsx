import Container from "../container/container";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ filter, setFilter }) {
  const handleLoadMoreClikck = () => {
    setFilter({ ...filter, page: (filter.page += 1) });
  };
  return (
    <Container>
      <button className={styles.loadMoreBtn} onClick={handleLoadMoreClikck}>
        Load more
      </button>
    </Container>
  );
}
