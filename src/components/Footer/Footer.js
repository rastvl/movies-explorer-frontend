
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer_year">© 2020</p>
        <ul className="footer__links">
          <li className="footer__link-element"><a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer noopener">Яндекс.Практикум</a></li>
          <li className="footer__link-element"><a href="https://github.com/rastvl" className="footer__link" target="_blank" rel="noreferrer noopener">Github</a></li>
          <li className="footer__link-element"><a href="https://github.com/rastvl" className="footer__link" target="_blank" rel="noreferrer noopener">Facebook</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;