import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const refAvatar = React.useRef();

    function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
        avatar: refAvatar.current.value,
    });
  }

    React.useEffect(() => {
        refAvatar.current.value = "";
    }, [props.isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить"
    isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__label">
        <input ref={refAvatar} type="url" className="form__input popup__input popup__input_avatar-name" name="avatar"
          defaultValue="" placeholder="Ссылка на аватар" minLength="2" maxLength="200" required
          autoComplete="off" />
        <span id="avatar-error" className="error avatar-error">Необходимо заполнить данное поле</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;