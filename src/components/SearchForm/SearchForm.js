import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from './../../images/search-form-icon.svg';
// import { useState } from 'react';
// import Preloader from '../Preloader/Preloader';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SearchForm = ({onSearchFormSubmit, values, onFormChange, onFilterCheckbox}) => {

  // const handleFilterCheckbox = evt => {
  //   setValues({...values, isShort: evt.target.checked});
  // }

  const handleChange = evt => {
    // console.log(evt);
    onFormChange(evt.target.value);
    // setValues({...values, query: evt.target.value.toLowerCase()});
  }

  return (
    <>
    <div className='search-element'>
      <div className="search-form">
        <div className="search-form__container">
          <img className="search-form__icon" src={icon} alt="Иконка поиска" />
          <form className="search" onSubmit={ onSearchFormSubmit }>
            <input
              className='search__input'
              name="movieQuery"
              type="text"
              placeholder='Фильм'
              onChange={ handleChange }
              value={ values.query }
              required
            />
            <button
              type="submit"
              className='search__button'
              onClick={ onSearchFormSubmit }
            />
          </form>
          <FilterCheckbox onCheckboxClick={ onFilterCheckbox } value={ values.isShort }/>
        </div>
      </div>
    </div>

    {/* { isLoaded ?
      (isFound ? <MoviesCardList /> : <p className="movies__not-found">Ничего не найдено</p>)
      :
      <Preloader />
    } */}
    </>
  );
};

export default SearchForm;