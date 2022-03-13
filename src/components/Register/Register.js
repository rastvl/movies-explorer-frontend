import { Link } from 'react-router-dom';
import logo from './../../images/logo.svg';

const Register = () => {
  return (
    <section className="auth-page">
      <div className="welcome">
        <img className='welcome__logo' src={logo} alt="Логотип" />
        <h1 className="welcome__title">Добро пожаловать!</h1>
        <form className="form">
          <div className="form__container">
            <fieldset className="form__inputs">
              <label className="form__label" htmlFor="name">Имя</label>
              <input className="form__input" id="name" type="text" required/>
              <label className="form__label" htmlFor="email">E-mail</label>
              <input className="form__input" id="email" type="email" required/>
              <label className="form__label" htmlFor="password">Пароль</label>
              <input className="form__input form__input_error" id="password" type="password" required/>
              <span className="form__error-msg">Что-то пошло не так...</span>
            </fieldset>

            <button className="form__submit" type="submit">Зарегистрироваться</button>
          </div>
        </form>
        <div className='go-login'>
          <p className="go-login__title">
            Уже зарегистрированы?
          </p>
          <Link to="/signin" className="app__blue-link go-login__link">Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;