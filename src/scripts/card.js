// Функция создания карточки
import {deleteCard} from './api.js'

export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback, profileId) {
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = cardData.link
    cardImage.alt = cardData.name

    const cardTitle = cardElement.querySelector('.card__title')
    cardTitle.textContent = cardData.name

    const deleteButton = cardElement.querySelector('.card__delete-button')
    if (cardData.owner._id !== profileId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCallback(cardElement, cardData._id); // Передаём cardData._id
        });
    }
    
    // Добавляем обработчик клика по лайку
    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeCallback)

    // Добавляем обработчик клика по изображению
    cardImage.addEventListener('click', () => imageClickCallback(cardData))
    
    return cardElement
}
  
// Функция удаления карточки
export function deleteCards(cardElement, cardId) {
    deleteCard(cardId)
    .then(() => {
        cardElement.remove()
    })
    .catch((error) => {
        console.log('Ошибка ui при удалении карточки:', error)
    })
}
  
// Обработчик лайка
export function likeCardHandler(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}