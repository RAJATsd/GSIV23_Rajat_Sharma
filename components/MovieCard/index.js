import styles from "./styles.module.css";

const MovieCard = ({
  title = "Harry Potter and The Order Of The Pheionix",
  rating = "10",
  description = "This is the description on the front of everything and harry fights everyone in the scene ",
  poster,
}) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieImageContainer}>
        {poster && <img src={poster} alt={`${title} poster`} />}
      </div>
      <div className={styles.movieDetails}>
        <div className={styles.nameAndRatingContainer}>
          <div className={styles.movieName}>{title}</div>
          <div className={styles.movieRating}>({rating})</div>
        </div>
        <div className={styles.movieDescription}>{description}</div>
      </div>
    </div>
  );
};

export default MovieCard;
