import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";


const Movies = () => {
  return (
    <>
      <main className="movies">
        <SearchForm

        />
        {/* <section className="movies-result"> */}
          <MoviesCardList />
          {/* <button type="button" className="movies-result__more-movies app__link">Ещё</button> */}
        {/* </section> */}

      </main>
      
    </>
  );
};

export default Movies;