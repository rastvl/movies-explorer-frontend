import likeImg from './../../images/movie-like-btn.svg';
import likeImgActive from './../../images/movie-like-btn_active.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const MoviesCard = ({movie}) => {
  const location = useLocation();
  const [isLiked, setLike] = useState(false);

  const { image, nameRU, duration, trailerLink } = movie; // needed later

  const handleLike = () => {
    setLike(isLiked => {
      return !isLiked;
    });
  }

  return (
    <li className="movie-card">
      <div className="movie-card__description">
        <div className='movie-card__wrapper'>
          <h2 className="movie-card__title">{ nameRU }</h2>
          <p className="movie-card__duration">{ duration }</p>
        </div>
        {
          location.pathname === '/saved-movies' ?
            <button className="movie-card__like-button movie-card__like-button_remove app__link" />
            :
            <button className={`movie-card__like-button ${isLiked ? 'movie-card__like-button_active' : ''}`} onClick={ handleLike } />
        }
      </div>
      <a href={trailerLink} className="movie-card__link-cover app__link">
        <img className="movie-card__cover" alt="Обложка фильма" src={image}/>
      </a>
    </li>
  );
};

export default MoviesCard;