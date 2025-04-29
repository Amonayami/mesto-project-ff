//Импорт node-fetch
import fetch from 'node-fetch';

//Конфиг api
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: 'dc365ebe-0be3-4cde-90b7-e9c52f83f3c8',
      'Content-Type': 'application/json'
    }
  }

//Получаем профиль
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((data) => {
    console.log(data)
    return data
  })
  .catch((error) => {
    console.log('Ошибка api получения профиля:', error)
  })
}
  
//Получаем карточки
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((data) => {
    console.log(data)
    return data
  })
  .catch((error) => {
    console.log('Ошибка api получения карточек:', error)
  })
}

//Обновление профиля
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name: name, about: about})
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((error) => {
      console.log('Ошибка api обновления профиля:', error)
    })
  }

//Добавляем новую карточку
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({name: name, link: link})
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((error) => {
      console.log('Ошибка api обновления карточек:', error)
    })
  }

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((error) => {
    console.log('Ошибка api удаления карточек:', error)
  })
}