// import { useState } from 'react';

const FilterCheckbox = ({ onCheckboxClick, value }) => {

  // const [isCheckboxActive, setCheckboxActive] = useState(value);

  // const handleCheckBox = () => {
  //   setCheckboxActive(checkbox => !checkbox);
  // }

  const handleChange = (evt) => {
    onCheckboxClick(evt)
  }

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <label className="filter-checkbox__label" htmlFor="native-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox__checkbox-hidden"
            id="native-checkbox"
            onChange={ handleChange }
            value={value}
          />
          <div className='custom-checkbox' onClick={ onCheckboxClick }>
            <div className={`custom-checkbox__circle ${value && "custom-checkbox__circle_active"}`}></div>
          </div>
        </label>
        <p className="filter-checkbox__description">Короткометражки</p>
      </div>
    </div>
  );
};

export default FilterCheckbox;