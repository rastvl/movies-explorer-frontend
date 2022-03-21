import { baseUrl, checkResponse } from "./constants";

const headers = {
  "Content-Type": "application/json",
}

export default class MainApi {

  static _setValidHeaders(headers) {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  static getCurrentUser() {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: MainApi._setValidHeaders(headers),
    }).then(checkResponse);
  }

  static updateCurrentUser({name, email}) {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: MainApi._setValidHeaders(headers),
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(checkResponse);
  }

  static getUserMovies() {
    return fetch(`${baseUrl}/movies`, {
      method: "GET",
      headers: MainApi._setValidHeaders(headers)
    }).then(checkResponse);
  }

  static addMovieToFavorite(movie) {
    return fetch(`${baseUrl}/movies`, {
      method: "POST",
      headers: MainApi._setValidHeaders(headers),
      body: JSON.stringify(movie)
    }).then(checkResponse);
  }

  static deleteMovieFromFavorite(movie) {
    return fetch(`${baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: MainApi._setValidHeaders(headers),
    }).then(checkResponse);
  }


};