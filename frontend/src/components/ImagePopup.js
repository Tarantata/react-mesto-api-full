import React from "react";

function ImagePopup (props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose} aria-label="Закрыть форму"></button>
        <div className="popup__form-picture">
          <img className="popup__picture-link" src={props.card.link} alt={props.card.name}/>
          <h2 className="popup__picture-name">{props.card.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;