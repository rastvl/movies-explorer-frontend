import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { MAX_CARDS_DESKTOP, MAX_CARDS_MOBILE } from "../../utils/constants";
import { useEffect, useState } from "react";

const MoviesCardList = ({ result, onAdd, onDelete }) => {
  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  let isMobile = innerWidth <= 768;

  let MAX_CARDS_PER_PAGE =
    location.pathname === "/saved-movies"
      ? result.length
      : isMobile
      ? MAX_CARDS_MOBILE
      : MAX_CARDS_DESKTOP;

  const showMoreCard = () => {
    setVisibleCards([
      ...visibleCards,
      ...result.slice(
        visibleCards.length,
        visibleCards.length + MAX_CARDS_PER_PAGE
      ),
    ]);
  };

  const isButtonVisible = visibleCards.length !== result.length;

  useEffect(() => {
    const checkWidthInterval = setInterval(() => {
      setInnerWidth(window.innerWidth);
    }, 500);

    setVisibleCards((cards) => {
      if (cards.length > 0) {
        return result.slice(0, cards.length);
      }
      return result.slice(0, MAX_CARDS_PER_PAGE);
    });

    return () => clearTimeout(checkWidthInterval);
  }, [result, MAX_CARDS_PER_PAGE]);

  return (
    <section className="movies-result">
      <ul className="movies-card-list">
        {visibleCards.map((movieCard) => {
          return (
            <MoviesCard
              movie={movieCard}
              key={movieCard.id || movieCard.movieId}
              onAdd={onAdd}
              onDelete={onDelete}
              isLiked={
                localStorage.getItem("favoriteMovies") &&
                localStorage
                  .getItem("favoriteMovies")
                  .includes(movieCard.movieId.toString())
              }
            />
          );
        })}
      </ul>
      {location.pathname === "/movies" && (
        <button
          type="submit"
          className={`movies-result__more-movies app__link ${
            !isButtonVisible && "movies-result__more-movies_off"
          }`}
          onClick={showMoreCard}
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
