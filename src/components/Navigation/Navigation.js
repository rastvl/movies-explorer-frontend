import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <nav className={`navigation`}>
        <ul className="navigation__links">
          <li  className="navigation__element">
            <Link to="/movies" className={`navigation__link app__link ${location.pathname === '/movies' && 'navigation__link_active'}`}>Фильмы</Link>
          </li>
          <li  className="navigation__element">
            <Link to="/saved-movies" className={`navigation__link app__link ${location.pathname === '/saved-movies' && 'navigation__link_active'}`}>Сохранённые фильмы</Link>
          </li>
        </ul>

      </nav>
      <Link to="/profile" className={`profile-link app__link`}>Аккаунт</Link>
      <BurgerMenu />
    </>
  );
};

export default Navigation;