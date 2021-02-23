import { RouteComponentProps, StaticContext } from "react-router";
import { getMovie, Movie } from "../../api/movies";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MoviePage.module.css";

const MoviePage = ({
  match,
  location,
}: RouteComponentProps<{ id: string }, StaticContext, { movie?: Movie }>) => {
  const movieFromUrl = location.state?.movie;
  const [movie, setMovie] = useState(movieFromUrl);

  useEffect(() => {
    if (!movieFromUrl) {
      // TODO: change to async await..
      getMovie(match.params.id).then(setMovie);
    }
  }, []);

  // TODO: should sanitize movie.synopsis

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>
        Back to movies
      </Link>
      {movie && (
        <div className={styles.card}>
          <img
            className={styles.image}
            src={movie.largeimage}
            alt={movie.title}
          />
          <div className={styles.info}>
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.details}>
              {movie.released} | {movie.runtime} | {movie.rating}
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: movie.synopsis }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
