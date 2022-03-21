import photo from './../../images/student-pic.png';

const Student = () => {
  return (
    <section className="student">
      <h2 className="landing__section-title">Студент</h2>

      <div className="student__container">
        <div className="student__info">
          <h3 className="student__name">Владислав</h3>
          <p className="student__job">Фронтенд-разработчик, 23 года</p>
          <p className="student__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className="student__social">
            <a href='https://github.com/rastvl' target="_blank" className="student__link" rel="noopener noreferrer" >Facebook</a>
            <a href='https://github.com/rastvl' target="_blank" className="student__link" rel="noopener noreferrer" >Github</a>
          </div>
        </div>
        <div className="student__pic">
          <img className="student__imgpic" src={ photo } alt="Фото студента" />
        </div>
      </div>

      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__projects">
          <a href="https://github.com/rastvl/how-to-learn" className="portfolio__project-link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__project-name">Статичный сайт</p>
            <p className="logo-link">↗</p>
          </a>
          <a href="https://github.com/rastvl/russian-travel" className="portfolio__project-link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__project-name">Адаптивный сайт</p>
            <p className="logo-link">↗</p>
          </a>
          <a href="https://github.com/rastvl/react-mesto-api-full" className="portfolio__project-link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__project-name">Одностраничное приложение</p>
            <p className="logo-link">↗</p>
          </a>
        </div>
      </section>
    </section>
  );
};

export default Student;