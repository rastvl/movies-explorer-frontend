import { useLocation } from "react-router-dom";
import { useState } from "react";
import { convertMovieDuration } from "../../utils/service";

const MoviesCard = ({ movie, onAdd, onDelete, isLiked }) => {
  const location = useLocation();

  const [isLike, setLike] = useState(isLiked);

  const { image, nameRU, durationString, trailerLink } = movie;
  if (!movie.durationString) movie = convertMovieDuration(movie);

  const handleLike = () => {
    setLike(true);
    onAdd({
      country: movie.country || "unknown",
      director: movie.director || "unknown",
      duration: movie.duration,
      year: movie.year,
      description: movie.description || "unknown",
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url,
      owner: movie.owner,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
  };

  const handleRemove = () => {
    setLike(false);
    onDelete(movie);
  };

  return (
    <li className="movie-card">
      <div className="movie-card__description">
        <div className="movie-card__wrapper">
          <h2 className="movie-card__title">{nameRU}</h2>
          <p className="movie-card__duration">{durationString}</p>
        </div>
        {location.pathname === "/saved-movies" ? (
          <button
            className="movie-card__like-button movie-card__like-button_remove app__link"
            onClick={handleRemove}
          />
        ) : !isLike ? (
          // <button className={`movie-card__like-button ${isLiked && 'movie-card__like-button_active'}`} onClick={ handleLike } />
          <button className={`movie-card__like-button`} onClick={handleLike} />
        ) : (
          <button
            className={`movie-card__like-button movie-card__like-button_active`}
            onClick={handleRemove}
          />
        )}
      </div>
      <a
        href={trailerLink}
        target="_blank"
        className="movie-card__link-cover app__link"
        rel="noreferrer"
      >
        <img
          className="movie-card__cover"
          alt="Обложка фильма"
          src={image.url || image}
        />
      </a>
    </li>
  );
};

export default MoviesCard;
