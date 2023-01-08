import React from "react";
import OK from '../images/OK.svg';
import NotOk from '../images/notOK.svg';

function InfoTooltip(props) {
  let img = props.tooltipIsOk ? OK : NotOk;
  return (
    <div className="popup__container">
      <div className={`popup ${props.isOpen && 'popup_active'}`}>
        <div className="popup__form-message">
          <button className="popup__close-message" type="button" onClick={props.onClose} aria-label="Закрыть форму"></button>
          <div className="form form__registration">
            <div className="popup__cover">
              <img className="popup__img" src={img} alt=""/>
              <p className="popup__comment">{props.tooltipMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  export default InfoTooltip;