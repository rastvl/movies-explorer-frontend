

const Profile = () => {


  return (
    <section className="profile">
      <h1 className="profile__hello-message">Привет, Виталий!</h1>
        {/* <div className="profile__form-wrapper"> */}
          <form className="edit-form">
            <div className="edit-form__input-wrapper">
              <label className="edit-form__label" htmlFor="name">Имя</label>
              <input className="edit-form__input" id="name" type="text" defaultValue={`Виталий`} />
            </div>
            <div className="edit-form__input-wrapper">
              <label className="edit-form__label" htmlFor="email">E-mail</label>
              <input className="edit-form__input" id="email" type="email" defaultValue={`pochta@yandex.ru`} />
            </div>
            <button type="submit" className="edit-form__submit-button app__link">Редактировать</button>
          </form>
        {/* </div> */}
      <button className="profile__sign-out app__link">Выйти из аккаунта</button>
    </section>
  );
};

export default Profile;