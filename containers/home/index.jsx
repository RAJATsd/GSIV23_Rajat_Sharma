import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

import MovieCard from "@/components/MovieCard";
import { MOVIE_POSTER_PREFIX_URL } from "@/constants";
import styles from "./styles.module.css";
import {
  fetchMoreMoviesStart,
  fetchMovieListStart,
  searchMoreMoviesStart,
} from "./reducer";
import {
  makeSelectMoviesList,
  makeSelectSearchedMovies,
  makeSelectSearchQuery,
} from "./selectors";

const HomePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMoviesList());
  const { data: searchedMovieData } = useSelector(makeSelectSearchedMovies());
  const searchQuery = useSelector(makeSelectSearchQuery());

  const { page, total_pages, results } = data || {};
  const {
    results: searchedMoviesResults,
    page: searchPage,
    total_pages: totalSearchPages,
  } = searchedMovieData || {};
  const doSearchedMovieResultsExist = searchedMoviesResults?.length > 0;

  useEffect(() => {
    if (!results?.length) {
      dispatch(fetchMovieListStart());
    }
  }, [results]);

  const fetchMoreMovies = () => {
    dispatch(fetchMoreMoviesStart(page + 1));
  };

  const handleCardClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const searchMoreMovies = () => {
    dispatch(
      searchMoreMoviesStart({ query: searchQuery, page: searchPage + 1 })
    );
  };

  return (
    <InfiniteScroll
      dataLength={
        doSearchedMovieResultsExist
          ? searchedMoviesResults.length
          : results?.length || 0
      }
      next={doSearchedMovieResultsExist ? searchMoreMovies : fetchMoreMovies}
      hasMore={
        doSearchedMovieResultsExist
          ? searchPage < totalSearchPages
          : page < total_pages
      }
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className={styles.moviesListContainer}>
        {(doSearchedMovieResultsExist ? searchedMoviesResults : results)?.map(
          (movie) => (
            <MovieCard
              id={movie.id}
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              description={movie.overview}
              poster={MOVIE_POSTER_PREFIX_URL + movie.poster_path}
              onClick={handleCardClick}
            />
          )
        )}
      </div>
    </InfiniteScroll>
  );
};

export default HomePage;
