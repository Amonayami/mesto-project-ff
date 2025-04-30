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

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}


//Получаем профиль
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  }).then(checkResponse)
}
  
//Получаем карточки
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  }).then(checkResponse)
}

//Обновление профиля
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name: name, about: about})
  }).then(checkResponse)
  }

//Добавляем новую карточку
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({name: name, link: link})
  }).then(checkResponse)
  }

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse)
}

//Удаление / добавление лайков
export const toggleCardLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then(checkResponse)
}

//Обновление аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: avatarUrl})
  }).then(checkResponse)
}