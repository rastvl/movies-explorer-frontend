

const AboutProject = () => {
  return (
    <section className="about-project" id="about">
      <h2 className="landing__section-title">О проекте</h2>
      <div className="about-project__grid">
        <div className="about-project__grid-column">
          <p className="about-project__grid-title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__grid-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__grid-column">
          <p className="about-project__grid-title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__grid-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="infographic">
        <div className="infographic-column">
          <div className="infographic__progress">
            <p className="infographic__progress-text">1 неделя</p>
          </div>
          <p className="infographic__caption">Back-end</p>
        </div>
        <div className="infographic-column">
          <div className="infographic__progress infographic__progress_large">
            <p className="infographic__progress-text">4 недели</p>
          </div>
          <p className="infographic__caption">Front-end</p>
        </div>
      </div>

    </section>
  );
};

export default AboutProject;