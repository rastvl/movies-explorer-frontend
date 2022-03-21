// import { useState } from 'react';

const FilterCheckbox = ({ onCheckboxClick, isShort }) => {

  // const [isCheckboxActive, setCheckboxActive] = useState(value);

  // const handleCheckBox = () => {
  //   setCheckboxActive(checkbox => !checkbox);
  // }

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <label className="filter-checkbox__label" htmlFor="native-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox__checkbox-hidden"
            id="native-checkbox"
            onChange={ onCheckboxClick }
            checked={isShort}
          />
          <div className='custom-checkbox' >
            <div className={`custom-checkbox__circle ${isShort ? "custom-checkbox__circle_active" : ''}`}></div>
          </div>
        </label>
        <p className="filter-checkbox__description">Короткометражки</p>
      </div>
    </div>
  );
};

export default FilterCheckbox;