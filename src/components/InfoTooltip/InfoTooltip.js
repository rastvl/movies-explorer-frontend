import tooltipOk from "./../../images/tooltip-ok.svg"
import tooltipFailed from "./../../images/tooltip-failed.svg"

const InfoTooltip = (props) => {
  return (
    <div className="popup-container">
      <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__content auth-status">
          <button type="button" className="popup__close" onClick={props.onClose}></button>
          <img className="auth-status__image" src={props.isOk ? tooltipOk : tooltipFailed} alt="статус" />
          <p className="auth-status__text">
            {props.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;