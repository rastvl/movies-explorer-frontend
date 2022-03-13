import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from './../../images/search-form-icon.svg';


const SearchForm = () => {
  return (
    <div className='search-element'>
      <div className="search-form">
        <div className="search-form__container">
          <img className="search-form__icon" src={icon} alt="Иконка поиска" />
          <form className="search">
            <input className='search__input' type="text" placeholder='Фильм' required/>
            <button type="submit" className='search__button' />
          </form>
          <FilterCheckbox />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;