import { moviesApiUrl, checkResponse } from "./constants";

const getAllMovies = () => {
  return fetch(moviesApiUrl, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(checkResponse);
}

export default getAllMovies;