import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.css";
import SearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import { fetchMovieListStart } from "./reducer";
import { makeSelectMoviesList, selectMovieState } from "./selectors";
import { MOVIE_POSTER_PREFIX_URL } from "@/constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMoviesList());

  useEffect(() => {
    dispatch(fetchMovieListStart());
  }, []);

  return (
    <div>
      <SearchBar />
      <div className={styles.moviesListContainer}>
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            description={movie.overview}
            poster={MOVIE_POSTER_PREFIX_URL + movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
