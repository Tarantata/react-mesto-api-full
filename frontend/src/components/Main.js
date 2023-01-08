import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="core">
      <section className="profile">
        <div className="profile__avatar-picture" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" alt="логотип сайта Место"/>
        </div>
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button className="profile__edit" type="button" onClick={props.onEditProfile} />
          <button className="profile__add" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="places">
        <ul className="content">
          {props.cards.map((item) => (
            <Card card={item} likes={item.likes} key={item._id} name={item.name} link={item.link} owner={item.owner}
          onCardClick={props.onCardClick}
          onCardLike={props.handleCardLike}
          onCardDelete={props.handleCardDelete}
          onAddPlace={props.onAddPlace}
          />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;