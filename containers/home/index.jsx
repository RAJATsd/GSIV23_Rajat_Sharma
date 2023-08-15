import styles from "./styles.module.css";
import SearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <div className={styles.moviesListContainer}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default HomePage;
