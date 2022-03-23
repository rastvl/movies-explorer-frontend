import { SHORT_MOVIE_DURATION, moviesApiBaseUrl } from "./constants";

/**
 *  Converts movies array into a more convenient form
 */
export const convertMovies = (movies) => {
  return movies.map((movie) => {
    movie.isShort = (movie.duration <= 40) ? true : false;

    for (let prop in movie) {
      if (!movie[prop]) movie[prop] = "";
    }

    movie = convertMovieDuration(movie)
    movie.image.url = `${moviesApiBaseUrl}${movie.image.url}`;
    movie.image.formats.thumbnail.url = `${moviesApiBaseUrl}${movie.image.formats.thumbnail.url}`;
    movie.movieId = movie.id;
    return movie;
  });
};

/**
 * Converts duration int to string and returns movie back
 */
export const convertMovieDuration = (movie) => {
  const durationHours = Math.trunc(movie.duration / 60);
  const durationMinutes = movie.duration % 60;
  movie.durationString = `${durationHours}ч ${durationMinutes}м`;
  return movie;
}

/**
 * Returns an array of movies that satisfy the key
 */
export const getMoviesByKey = (movies, key, isShort = false) => {

  return movies.filter((movie) => {
    const isMovieFit =
      movie.nameRU.toLowerCase().includes(key.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(key.toLowerCase()) ||
      movie.description.includes(key.toLowerCase()) ||
      movie.director.includes(key.toLowerCase());
    if ((isMovieFit && !isShort) || (isMovieFit && isShort && (movie.duration <= SHORT_MOVIE_DURATION)))
      return true;
    return false;
  });

};
