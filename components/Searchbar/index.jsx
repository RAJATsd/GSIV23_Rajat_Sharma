import styles from "./styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <SearchIcon />
        <input placeholder="Search" />
      </div>
      <HomeIcon />
    </div>
  );
};

export default SearchBar;
