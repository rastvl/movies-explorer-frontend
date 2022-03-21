import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { formRegex } from "../../utils/constants";

const Profile = ({ onLogout, onUserUpdate }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } =
    useFormWithValidation({
      name: currentUser.name,
      email: currentUser.email
    });

  const isDidable =
    values.name === "" ||
    values.email === "" ||
    !isValid ||
    (values.name === currentUser.name && values.email === currentUser.email);

  const handleProfileUpdate = (evt) => {
    evt.preventDefault();
    !isDidable && onUserUpdate(values);
  };
  return (
    <section className="profile">
      <h1 className="profile__hello-message">{`Привет, ${currentUser.name}!`}</h1>
      {/* <div className="profile__form-wrapper"> */}
      <form className="edit-form">
        <div className="edit-form__input-wrapper">
          <label className="edit-form__label" htmlFor="name">
            Имя
          </label>
          <input
            className="edit-form__input"
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            // defaultValue={currentUser.name}
            value={values.name}
            pattern={formRegex.name}
          />
        </div>
        {errors.name && <span className="form__error-msg">{errors.name}</span>}
        <div className="edit-form__input-wrapper">
          <label className="edit-form__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="edit-form__input"
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            // defaultValue={currentUser.email}
            value={values.email}
            pattern={formRegex.email}
          />
        </div>
        {errors.email && (
          <span className="form__error-msg">{errors.email}</span>
        )}
        <button
          type="submit"
          className={`edit-form__submit-button app__link ${
            isDidable && "edit-form__submit-button_disabled"
          }`}
          onClick={ handleProfileUpdate }
        >
          Редактировать
        </button>
      </form>
      {/* </div> */}
      <button
        className="profile__sign-out app__link"
        onClick={onLogout}
        type="submit"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
};

export default Profile;
