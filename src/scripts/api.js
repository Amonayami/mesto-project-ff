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
    console.log('Ошибка api профиля:', error)
  })
}
  
//Получаем карточки
const getCards = () => {
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
    console.log('Ошибка api карточек:', error)
  })
}