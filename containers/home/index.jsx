import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import SearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import { MOVIE_POSTER_PREFIX_URL } from "@/constants";
import styles from "./styles.module.css";
import { fetchMoreMoviesStart, fetchMovieListStart } from "./reducer";
import { makeSelectMoviesList } from "./selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMoviesList());

  const { page, total_pages, results } = data || {};

  useEffect(() => {
    dispatch(fetchMovieListStart());
  }, []);

  const fetchMoreMovies = () => {
    dispatch(fetchMoreMoviesStart(page + 1));
  };

  return (
    <div>
      <SearchBar />
      <InfiniteScroll
        dataLength={results?.length || 0}
        next={fetchMoreMovies}
        hasMore={page < total_pages}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={styles.moviesListContainer}>
          {data?.results.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              description={movie.overview}
              poster={MOVIE_POSTER_PREFIX_URL + movie.poster_path}
            />
          ))}{" "}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
