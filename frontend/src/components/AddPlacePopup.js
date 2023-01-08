import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangePlace(evt) {setName(evt.target.value);}

  function handleChangeLink(evt) {setLink(evt.target.value);}

  function handleSubmit(evt) {
  evt.preventDefault();
  props.onAddPlace({name: name, link: link});
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  return (
    <PopupWithForm name="card" title="Новое место" buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input onChange={handleChangePlace} type="text" className="form__input popup__input popup__input_place-name" name="name" placeholder="Название" minLength="2" maxLength="30" required autoComplete="off" value={name} />
        <span id="name-error" className="error name-error">Необходимо заполнить данное поле</span>
      </label>
      <label className="popup__label">
        <input onChange={handleChangeLink} type="url" className="form__input popup__input popup__input_place-link" name="link" /*defaultValue=""*/ placeholder="Ссылка на картинку" required autoComplete="off" value={link}/>
        <span id="link-error" className="error link-error">Необходимо заполнить данное поле</span>
    </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;