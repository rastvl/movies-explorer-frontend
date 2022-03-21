import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error">
      <h1 className="error__title">404</h1>
      <p className="error__message">Страница не найдена</p>
      <Link to="/" className="error__backpage app__blue-link">Назад</Link>
    </div>
  );
};

export default NotFound;

