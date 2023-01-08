import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  /* Определяем, являемся ли мы владельцем текущей карточки */
  const card = props.card;
  const isOwn = props.owner._id === currentUser._id;

  /* Создаём переменную, которую после зададим в `ClassName` для кнопки удаления */
  const cardDeleteButtonClassName = (
    `card__icon-delete ${isOwn ? '' : 'card__icon-delete_inactive'}`
  );

  /* Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = props.likes.some(i => i._id === currentUser._id);

  /* Создаём переменну, которую после зададим в `className` длякнопки лайка */
  const cardLikeButtonClassName = (
    `card__icon-like ${isLiked ? 'card__icon-like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <div>
      <li className="card">
        <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="Кнопка удалить"></button>
        <img className="card__place" src={props.card.link} alt={props.card.name}
        onClick={handleClick} />
        <div className="card__info">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__likes">
            <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайк"></button>
            <p className="card__like-total">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;