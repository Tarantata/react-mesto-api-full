export const BASE_URL = "https://auth.nomoreparties.co";

function checkingInfo(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: код ${res.status}`);
}

export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkingInfo)
  }

  export function authorize (email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email, password})
      })
        .then(checkingInfo)
  }

  export function checkToken (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
            }
          }
      )
        .then(checkingInfo)
}
