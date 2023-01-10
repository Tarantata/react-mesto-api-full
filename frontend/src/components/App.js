import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Api from "../utils/Api";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from "./ProtectRoute";
import LogIn from "./LogIn";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipIsOk, setTooltipIsOk] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [jwt, setJwt] = React.useState(null);
  const history = useHistory();

  const api = new Api({
    url: `https://api.trialdomen.students.nomoredomains.club/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
})

  function handleRegister (email, password) {
    Auth.register(email, password)
      .then(() => {
        handleInfoTooltipOpen(
            'Вы успешно \n зарегистрировались!',
            true);
        history.push('./sign-in');
      })
      .catch(err => {
        handleInfoTooltipOpen(
            'Что-то пошло не так. \n Попробуйте ещё раз!',
            false)
        console.error(err)
      });
  }

  const handleAuthorize = React.useCallback(async (email, password) => {
    try {
      const data = await Auth.authorize(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setJwt(data.token);
        handleLogin(email);
        setIsLoggedIn(true);
        handleInfoTooltipOpen('Добро пожаловать!', true)
      }
    } catch {
      handleInfoTooltipOpen('Неправильный\n' + 'логин или пароль', false)
    } finally {
      setIsLoadingPage(false)
    }
  }, []);

  const handleTokenCheck = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await Auth.checkToken(token);
        if (res) {
          setJwt(token);
          handleLogin(res.email);
          setIsLoggedIn(true)
        }
      }} finally {
      setIsLoadingPage(false)
    }
  }, []);

  useEffect( () => {
    handleTokenCheck()
        .catch((err) => console.error(err))
  }, [handleTokenCheck]);

  const handleInfoTooltipOpen = (tooltipMessage, tooltipIsOk) => {
    setIsInfoTooltipOpen(true);
    setTooltipMessage(tooltipMessage);
    setTooltipIsOk(tooltipIsOk);
  };

  /* данные профиля с сервера */
    useEffect(() => {
      if (isLoggedIn) {
        api
          .getUserInfo()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch(err => console.error(err))
        }
    }, [isLoggedIn]);

  /* массив объектов карточек с сервера */
    useEffect(() => {
      if (email) {
        api
          .getInitialCards()
          .then((data) => {
            setCards(data.reverse());
          })
          .catch(err => console.error(err))
        }
    }, [isLoggedIn]);

  /* отправка карточки на сервер */
    function handleAddPlaceSubmit(cardData) {
      setIsLoading(!isLoading);
      api
        .createNewCard(cardData)
        .then((data) => {
          setIsLoading(!isLoading);
          setCards([data, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }

  /* отправка данных для лайка карточки */
    function handleCardLike(card) {
      const isLiked = card.likes.some((i) => i === currentUser._id);
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          console.log(card)
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
         })
        .catch(err => console.error(err));
    }

  /* отправка данных для удаления карточки */
    function handleCardDelete(card) {
      setIsLoading(!isLoading);
      api
        .deleteCard(card._id)
        .then(() => {
          setIsLoading(!isLoading);
          setCards(prevState => prevState.filter((item) => item._id !== card._id));
          closeAllPopups()
        })
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }

  /* отправка данных для изменения профиля */
  function handleUpdateUser(userData) {
    setIsLoading(!isLoading);
    api
      .updateProfile(userData)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }

 /* отправка данных для изменения аватара */
  function handleUpdateAvatar(avatarData) {
    api
      .getAvatarInfo(avatarData)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
    }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleConfirmPopupClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCurrentCard(card)
  }

  function handleCardClick(selectedCard) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(selectedCard);
  }

  function handleLogin(email) {
    setEmail(email);
    history.push('/');
  }

  function handleSignOut() {
    setCards([]);
    setEmail('');
    localStorage.removeItem('token');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
    setIsConfirmPopupOpen(false);
  };

  if (isLoadingPage) {
    return (
        <>
          <div className='page__loadingPage'>Loading...</div>
        </>
    )
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute exact path='/'
                          loggedIn={isLoggedIn}
                          component={Main}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onCardClick={handleCardClick}
                          handleCardLike={handleCardLike}
                          handleCardDelete={handleConfirmPopupClick}
                          cards={cards}
                          email={email}>
          </ProtectedRoute>

          <Route path="/sign-in">
            <LogIn onAuthorize={handleAuthorize} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect exact to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>

        <InfoTooltip isOpen={isInfoTooltipOpen} tooltipMessage={tooltipMessage} tooltipIsOk={tooltipIsOk} onClose={closeAllPopups} />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Попап добавления карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

        {/* Попап удаления карточки */}
        <ConfirmDeletePopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} actualCard={currentCard} isLoading={isLoading} />
        {/*  <button className="popup__button"  type="submit" aria-label="Сохранить изменения">Да</button>*/}
        {/*</ConfirmDeletePopup>*/}

        {/* Попап полноразмерной карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
