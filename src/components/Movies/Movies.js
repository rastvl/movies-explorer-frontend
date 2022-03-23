import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { getMoviesByKey } from "../../utils/service";
import { useLocation } from "react-router-dom";

const Movies = ({ movies, favoriteMovies, onAdd, onDelete, onEmptyQuery, lastSearch, onLastSearchUpdate }) => {
  const location = useLocation();

  // console.log(movies)
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFound, setIsFound] = useState(true);
  // console.log(lastSearch)
  const [values, setValues] = useState(lastSearch);
  const [moviesResult, setMoviesResult] = useState([]);


  // const saveLastSearchQuery = () => {
  //   if (location.pathname !== "/movies") return;
  //   localStorage.setItem("lastSearch", JSON.stringify(values));
  // };

  const showMoviesByQuery = () => {
    setIsLoaded(false);
    console.log('movies by query ', values.query);
    const moviesFound = getMoviesByKey(movies, values.query, values.isShort);
    // console.log(moviesFound)
    setIsFound(moviesFound.length);
    setMoviesResult(moviesFound);

    // saveLastSearchQuery();
    location.pathname === '/movies' && onLastSearchUpdate(values);

    setTimeout(() => setIsLoaded(true), 300);
  };

  // const getLastSearchQuery = () => {
  //   if (location.pathname !== "/movies") return;

  //   const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));

  //   if (lastSearch) {
  //     setValues(lastSearch);
  //     showMoviesByQuery();
  //     // handleSubmit({preventDefault: function() {}})
  //   } else {
  //     setValues({ query: "", isShort: false });
  //   }
  // };

  const handleFilterCheckbox = (evt) => {
    setValues({ ...values, isShort: evt.target.checked });
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
    // setValues({ query: "", isShort: false });
    console.log('NEW LOCATION!');
    console.log('lastSearch', lastSearch)
    setValues(lastSearch);
    console.log('values', values)
    setIsFound(true);
    showMoviesByQuery();
    // setMoviesResult([]);
    // getLastSearchQuery();
  }, [location.pathname]);

  useEffect(() => {
    setMoviesResult(favoriteMovies || []);
  }, [favoriteMovies]);

  useEffect(() => {
    if (values.query !== "" || location.pathname === "/saved-movies") {
      showMoviesByQuery();
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
