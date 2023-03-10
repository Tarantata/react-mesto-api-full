class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkingInfo(res) {
    if (res.ok) {
      return res.json()
    }
      return Promise.reject(`Ошибка: код ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkingInfo)
  }

    getInitialCards() {
      return fetch(`${this._url}cards`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
       .then(this._checkingInfo)
    }

    updateProfile(userData) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(userData)
      })
        .then(this._checkingInfo)
    }

    getAvatarInfo(avatarData) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(avatarData)
      })
        .then(this._checkingInfo)
    }

    createNewCard(cardData) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(cardData)
    })
        .then(this._checkingInfo)
  }

    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        credentials: 'include',
        headers: this._headers,
      })
        .then(this._checkingInfo)
    }

    deleteCard(cardId) {
      return fetch(`${this._url}cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then(this._checkingInfo)
    }
}

export default Api

