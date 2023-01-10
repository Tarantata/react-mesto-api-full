import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isLoading, onClose, actualCard, onCardDelete, isOpen}) {
    const buttonText = isLoading ? 'Удаление...' : "Да"

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(actualCard)
    }

  return (
    <PopupWithForm title='Вы уверены?' name='confirm' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={buttonText} />
  )
}

export default ConfirmDeletePopup