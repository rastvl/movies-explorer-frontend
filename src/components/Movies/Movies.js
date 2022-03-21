import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { getMoviesByKey } from "../../utils/service";
import { useLocation } from "react-router-dom";

const Movies = ({ movies, favoriteMovies, onAdd, onDelete, onEmptyQuery }) => {
  const location = useLocation();
  // console.log(movies)
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFound, setIsFound] = useState(true);

  const [values, setValues] = useState({ query: '', isShort: false });
  const [moviesResult, setMoviesResult] = useState([]);

  const showMoviesByQuery = () => {
    setIsLoaded(false);
    // setIsFound(false);
    console.log('showMoviesByQuery', values)
    const moviesFound = getMoviesByKey(movies, values.query, values.isShort);
    if (moviesFound.length > 0) setIsFound(true);
    setMoviesResult(moviesFound);
    setTimeout(() => setIsLoaded(true), 100);
  }

  const handleFilterCheckbox = (evt) => {
    // debugger;
    // console.log('handleFilterCheckbox', evt.target.checked)
    setValues({ ...values, isShort: evt.target.checked });
    // setValues(values => {
    //   console.log(values);
    //   return { ...values, isShort: evt.target.checked }
    // })
    // console.log('handleFilterCheckbox setValues', values)
    // console.log(values);

  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (values.query === "") {
      onEmptyQuery();
    } else {
      showMoviesByQuery();
    }
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

  useEffect(() => {
    if (values.query !== "" || location.pathname === '/saved-movies') {
      showMoviesByQuery();
    }
}, [ values.isShort ]);

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
