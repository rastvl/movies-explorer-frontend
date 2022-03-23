import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { getMoviesByKey } from "../../utils/service";
import { useLocation } from "react-router-dom";

const Movies = ({ movies, favoriteMovies, onAdd, onDelete, onEmptyQuery, lastSearch, onLastSearchUpdate }) => {
  const location = useLocation();
  // console.log(lastSearch)
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFound, setIsFound] = useState(true);
  const [values, setValues] = useState(lastSearch);
  const [moviesResult, setMoviesResult] = useState([]);

  const showMoviesByQuery = ({query, isShort}) => {
    setTimeout(() => {
      setIsLoaded(false);
      const moviesFound = getMoviesByKey(movies, query, isShort);

      setIsFound(moviesFound.length);
      setMoviesResult(moviesFound);

      setTimeout(() => setIsLoaded(true), 300);
    }, 0);
  };

  const handleFilterCheckbox = (evt) => {
    setValues({ ...values, isShort: evt.target.checked });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (values.query === "") {
      onEmptyQuery();
    } else {
      showMoviesByQuery(values);
      location.pathname === '/movies' && onLastSearchUpdate(values);
    }
  };

  const handleSearchFormChange = (value) => {
    setValues({ ...values, query: value});
  };

  useEffect(() => {
    setValues(lastSearch);
    setIsFound(true);
    showMoviesByQuery(lastSearch)
  }, [location.pathname]);

  useEffect(() => {
    setMoviesResult(favoriteMovies || []);
  }, [favoriteMovies]);

  useEffect(() => {
    if (values.query !== "" || location.pathname === "/saved-movies") {
      showMoviesByQuery(values);
      location.pathname === '/movies' && onLastSearchUpdate(values);
    }
  }, [values.isShort]);

  return (
    <>
      <main className="movies">
        <SearchForm
          onSearchFormSubmit={handleSubmit}
          values={values}
          onFormChange={handleSearchFormChange}
          onFilterCheckbox={handleFilterCheckbox}
        />

        {isLoaded ? (
          isFound ? (
            <MoviesCardList
              result={moviesResult}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ) : (
            <p className="movies__not-found">Ничего не найдено</p>
          )
        ) : (
          <Preloader />
        )}
      </main>
    </>
  );
};

export default Movies;
