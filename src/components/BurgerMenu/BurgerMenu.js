import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const BurgerMenu = () => {
  const location = useLocation();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  }
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  }

  return (
    // <div className="burger">
    //   <button type="button" onClick={handleMenuOpen}
    //     className={`burger-menu__btn app__link ${isBurgerMenuOpen ? "burger-menu__btn_none" : ''}`}>
    //   </button>
    //   <div className={`burger-menu ${isBurgerMenuOpen ? 'burger-menu_opened' : ''}`}>
    //     {/* <img className="burger-logo" src={ brugerLogo } alt="Бургер меню" /> */}
    //     <button type="button" onClick={handleMenuClose} className="burger-menu__close-btn"></button>
    //     <ul className="burger-menu__list">
    //       <li className="burger-menu__list-item">
    //         <Link to="/"
    //           onClick={handleMenuClose}
    //           className={`burger-menu__link app__link ${ location.pathname === "/" ? 'burger-menu__link_active' : ''}`}>
    //           Главная
    //         </Link>
    //       </li>
    //       <li className="burger-menu__list-item">
    //         <Link to="/movies"
    //           onClick={handleMenuClose}
    //           className={`burger-menu__link app__link ${ location.pathname === "movies" ? 'burger-menu__link_active' : ''}`}>
    //           Фильмы
    //         </Link>
    //       </li>
    //       <li className="burger-menu__list-item">
    //         <Link to="/saved-movies"
    //           onClick={handleMenuClose}
    //           className={`burger-menu__link app__link ${ location.pathname === "saved-movies" ? 'burger-menu__link_active' : ''}`}>
    //           Сохранённые фильмы
    //         </Link>
    //       </li>
    //     </ul>
    //     <Link to="/profile" className={`profile-link app__link profile-link_burger`}>Аккаунт</Link>
    //   </div>
    // </div>
    <>
    <button type="button" onClick={handleMenuOpen}
          className={`burger-menu__btn app__link ${isMenuOpen ? "burger-menu__btn_none" : ''}`}>
    </button>
    <div className={`menu ${isMenuOpen ? 'menu_opened' : ''}`}>
      <div className={`burger-menu ${isMenuOpen ? 'burger-menu_opened' : ''}`}>
        {/* <button type="button" onClick={handleMenuOpen}
          className={`burger-menu__btn app__link ${isBurgerMenuOpen ? "burger-menu__btn_none" : ''}`}>
        </button> */}
        <button type="button" onClick={handleMenuClose} className="burger-menu__close-btn app__link"></button>
        <ul className="burger-menu__list">
           <li className="burger-menu__list-item">
             <Link to="/"
               onClick={handleMenuClose}
               className={`burger-menu__link app__link ${ location.pathname === "/" ? 'burger-menu__link_active' : ''}`}>
               Главная
             </Link>
           </li>
           <li className="burger-menu__list-item">
             <Link to="/movies"
               onClick={handleMenuClose}
               className={`burger-menu__link app__link ${ location.pathname === "/movies" ? 'burger-menu__link_active' : ''}`}>
               Фильмы
             </Link>
           </li>
           <li className="burger-menu__list-item">
             <Link to="/saved-movies"
               onClick={handleMenuClose}
               className={`burger-menu__link app__link ${ location.pathname === "/saved-movies" ? 'burger-menu__link_active' : ''}`}>
               Сохранённые фильмы
             </Link>
           </li>
        </ul>
        <Link to="/profile" className={`profile-link app__link profile-link_burger`}>Аккаунт</Link>
      </div>
    </div>
    </>
  );
};

export default BurgerMenu;