import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({name, about});
  }

  return (
    <PopupWithForm name="person" title="Редактировать профиль" buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input onChange={handleChangeName} type="text" className="form__input popup__input popup__input_person-name" name="name" value={name || ''} placeholder="Имя" minLength="2" maxLength="40" required autoComplete="off"/>
        <span id="person-error" className="error name-error">Необходимо заполнить данное поле</span>
      </label>
      <label className="popup__label">
        <input onChange={handleChangeAbout} type="text" className="form__input popup__input popup__input_person-profession" name="about" value={about || ''} placeholder="О себе" minLength="2" maxLength="200" required autoComplete="off"/>
        <span id="profession-error" className="error about-error">Необходимо заполнить данное поле</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;