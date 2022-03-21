import { Link, useHistory } from 'react-router-dom';
import logo from './../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { formRegex } from '../../utils/constants';
import { useEffect } from 'react';

const Login = ({ onSignIn, loggedIn }) => {
  const history = useHistory();
  // // console.log(history)
  useEffect(() => {
    loggedIn && history.push('/');
  }, [loggedIn, history])


  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const isDisabled = (!isValid || values.email === '' || values.password === '');

  const handleSubmit = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    !isDisabled && onSignIn(values);
  }


  return (
    <section className="auth-page">
      <div className="welcome">
        <img className='welcome__logo' src={logo} alt="Логотип" />
        <h1 className="welcome__title">Рады видеть!</h1>
        <form className="form">
          <div className="form__container">
            <fieldset className="form__inputs">
              <label className="form__label" htmlFor="email">E-mail</label>
              <input
                className={`form__input ${errors.email && 'form__input_error'} `}
                id="email"
                name="email"
                type="email"
                value={ values.email || '' }
                onChange={ handleChange }
                pattern= { formRegex.email }
                required
              />
              { errors.email && <span className="form__error-msg">{ errors.email }</span> }

              <label className="form__label" htmlFor="password">Пароль</label>
              <input
                className={`form__input ${errors.password && 'form__input_error'} `}
                id="password"
                name="password"
                type="password"
                value={ values.password || '' }
                onChange={ handleChange }
                minLength={6}
                required
              />
              { errors.password && <span className="form__error-msg">{ errors.password }</span> }
              {/* <span className="form__error-msg">Что-то пошло не так...</span> */}
            </fieldset>

            <button
              // className="form__submit form__submit_login"
              className={ `form__submit form__submit_login ${isDisabled && `form__submit_disabled`} `}
              type="submit"
              onClick={ handleSubmit }
              >Войти
            </button>
          </div>
        </form>
        <div className='go-login'>
          <p className="go-login__title">
            Ещё не зарегистрированы?
          </p>
          <Link to="/signup" className="app__blue-link go-login__link">Регистрация</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;