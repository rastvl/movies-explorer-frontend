import { useState } from 'react';

const FilterCheckbox = () => {

  const [isCheckboxActive, setCheckboxActive] = useState(false);

  const handleCheckBox = () => {
    setCheckboxActive(!isCheckboxActive);
  }

  const handleChange = () => {
    console.log(isCheckboxActive);
  }

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <label className="filter-checkbox__label" htmlFor="native-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox__checkbox-hidden"
            id="native-checkbox"
            onChange={handleChange}
          />
          <div className='custom-checkbox' onClick={handleCheckBox}>
            <div className={`custom-checkbox__circle ${isCheckboxActive ? "custom-checkbox__circle_active" : ""}`}></div>
          </div>
        </label>
        <p className="filter-checkbox__description">Короткометражки</p>
      </div>
    </div>
  );
};

export default FilterCheckbox;