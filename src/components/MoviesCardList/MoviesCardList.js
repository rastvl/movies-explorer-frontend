import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

const MoviesCardList = () => {
  const location = useLocation();

  //temporary objects
  const movie_1 = {
    image: 'https://i1.sndcdn.com/avatars-000294039538-mse4oo-t500x500.jpg',
    nameRU: '33 слова о дизайне',
    duration: '1ч 42м',
    trailerLink: 'https://youtube.com'
  }
  const movie_2 = {
    image: 'https://i1.sndcdn.com/avatars-000294039538-mse4oo-t500x500.jpg',
    nameRU: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 42м',
    trailerLink: 'https://youtube.com'
  }

  const movies = [movie_1, movie_2, movie_1, movie_1, movie_1];

  return (
    <section className="movies-result">
      <ul className="movies-card-list">
        {movies.map((movieCard, ix) => {
          return (
            <MoviesCard movie={movieCard} key={ix}/>
          );
        })}
      </ul>
      {
        location.pathname === '/movies' && <button type="submit" className="movies-result__more-movies app__link">Ещё</button>
      }
    </section>

  );
};

export default MoviesCardList;