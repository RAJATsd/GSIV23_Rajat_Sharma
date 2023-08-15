import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import MovieImageHolder from "@/components/MovieImageHolder";
import { MOVIE_POSTER_PREFIX_URL } from "@/constants";
import styles from "./styles.module.css";
import { fetchMovieCreditsStart, fetchMovieDetailsStart } from "./reducer";
import { makeSelectMovieCredits, makeSelectMovieDetails } from "./selectors";

const MovieDetailsContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMovieDetails());
  const { data: movieCreditsData } = useSelector(makeSelectMovieCredits());

  const { id: movieId } = router.query;
  const { title, release_date, runtime, vote_average, overview, poster_path } =
    data || {};
  const { cast, crew } = movieCreditsData || {};
  const director = crew?.find((member) => member.department === "Directing");

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailsStart(movieId));
      dispatch(fetchMovieCreditsStart(movieId));
    }
  }, [movieId]);

  return (
    <div className={styles.movieDetailsContainer}>
      <div className={styles.movieImageWrapper}>
        <MovieImageHolder
          imgSrc={MOVIE_POSTER_PREFIX_URL + poster_path}
          altText={`${title} poster`}
        />
      </div>
      <div className={styles.movieInfo}>
        <div className={styles.title}>
          {title} ({vote_average})
        </div>
        <div className={styles.metadata}>
          {release_date?.substring(0, 4)} |{" "}
          {runtime && (
            <span>
              {`${Math.trunc(runtime / 60) > 9 ? "" : 0}${Math.trunc(
                runtime / 60
              )}`}
              :{`${runtime % 60 > 9 ? "" : 0}${runtime % 60}`}
            </span>
          )}{" "}
          | {director?.name}
        </div>
        <div className={styles.cast}>
          Cast:{" "}
          {cast?.map((actor) => (
            <span key={actor.id}>{actor.name}, </span>
          ))}
        </div>
        <div className={styles.description}>Description: {overview}</div>
      </div>
    </div>
  );
};

export default MovieDetailsContainer;
