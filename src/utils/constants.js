/**
 * Api
 */
export const baseUrl = 'https://api.rastvlmovies.students.nomoredomains.work';
export const moviesApiUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const headers = {
  "Content-Type": "application/json",
}


/**
 * Validation
 */
export const formRegex = {
  name: '^[а-яА-яёЁa-zA-Z\\s\\-]+$',
  email: '^((([0-9A-Za-z]{1}[-0-9A-z\\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\\.){1,2}[-A-Za-z]{2,})$',
}

// https://ru.stackoverflow.com/a/572635/430456
export const validationMessages = {
  name: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис',
  email: 'Неккоректный адрес электропочты',
}

/**
 * Cards
 */
export const MAX_CARDS_DESKTOP = 7;
export const MAX_CARDS_MOBILE = 5;