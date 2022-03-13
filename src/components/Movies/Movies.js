import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";


const Movies = () => {
  const [ isLoaded, setIsLoaded ] = useState(true);
  const [ isFound, setIsFound ] = useState(true);

  return (
    <>
      <main className="movies">
        <SearchForm />
        {/* <section className="movies-result"> */}

        { isLoaded ?
          (isFound ? <MoviesCardList /> : <p className="movies__not-found">Ничего не найдено</p>)
          :
          <Preloader />
        }
        {/* <MoviesCardList /> */}
          {/* <button type="button" className="movies-result__more-movies app__link">Ещё</button> */}
        {/* </section> */}

      </main>

    </>
  );
};

export default Movies;