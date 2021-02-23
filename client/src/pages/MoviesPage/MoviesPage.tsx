import styles from "./MoviesPage.module.css";
import { getMovies, Movie } from "../../api/movies";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [hasMore, setHasMore] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const start = useRef(0); // find a better name

  const currentSearch = useRef(searchValue);
  currentSearch.current = searchValue;

  // TODO: extract pagination logic to usePagination hook
  const loadMore = () => {
    getMovies({
      start: start.current,
      end: start.current + 20,
      search: currentSearch.current,
    }).then((movies) => {
      setMovies((prevMovies) => [...prevMovies, ...movies]);
      if (movies.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    });

    start.current += 20;
  };

  const debouncedSearch = useDebouncedCallback(setSearchValue, 500);

  React.useEffect(() => {
    start.current = 0;
    setMovies([]);
    loadMore();
  }, [searchValue]);

  const [loaderElement, setLoadingElement] = useState<HTMLDivElement | null>();

  useInfiniteScroll({ loaderElement: loaderElement, loadMore });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search a movie"
          onChange={(e) => debouncedSearch.callback(e.target.value)}
        />
      </div>
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMore && <div ref={setLoadingElement}>Loading...</div>}
    </div>
  );
};

const MovieItem = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      to={{ pathname: `/movies/${movie.id}`, state: { movie } }}
      className={styles.movie}
    >
      <img className={styles.movieImage} src={movie.image} alt={movie.title} />
      <div className={styles.movieTitle}>{movie.title}</div>
    </Link>
  );
};

export default MoviesPage;

// TODO: extract to separate module and add unit tests
const useInfiniteScroll = ({
  loadMore,
  loaderElement,
}: {
  loadMore: () => void;
  loaderElement?: HTMLElement | null;
}) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.intersectionRatio > 0) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    loaderElement && observer.observe(loaderElement);

    return () => {
      loaderElement && observer.unobserve(loaderElement);
    };
  }, [loaderElement]);
};
