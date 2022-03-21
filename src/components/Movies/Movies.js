import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { getMoviesByKey } from "../../utils/service";
import { useLocation } from "react-router-dom";

const Movies = ({ movies, favoriteMovies, onAdd, onDelete }) => {
  const location = useLocation();
  // console.log(movies)
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFound, setIsFound] = useState(true);

  const [values, setValues] = useState({ query: "", isShort: false });
  const [moviesResult, setMoviesResult] = useState([]);

  const handleFilterCheckbox = (evt) => {
    setValues({ ...values, isShort: evt.target.checked });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoaded(false);
    setIsFound(false);

    const moviesFound = getMoviesByKey(movies, values.query, values.isShort);
    console.log("found: ", moviesFound);
    if (moviesFound.length > 0) setIsFound(true);

    setMoviesResult(moviesFound);
    setTimeout(() => setIsLoaded(true), 200);
  };

  const handleSearchFormChange = (value) => {
    setValues({ ...values, query: value });
  };

  useEffect(() => {
    setValues({ query: "", isShort: false });
    setIsFound(true);
    // setMoviesResult([]);
  }, [location.pathname]);

  useEffect(() => {
    setMoviesResult(favoriteMovies || []);
  }, [favoriteMovies]);

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
