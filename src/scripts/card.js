import {deleteCard, toggleCardLike} from './api.js'

const cardTemplate = document.querySelector('#card-template').content
// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback, profileId) {
    
    // Получаем шаблон карточки
    const cardElement = getCardTemplate()
    
    // Заполняем данные изображения
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = cardData.link
    cardImage.alt = cardData.name
    
    // Заполняем заголовок
    const cardTitle = cardElement.querySelector('.card__title')
    cardTitle.textContent = cardData.name
    
    // Устанавливаем начальное количество лайков
    const likesCountElement = cardElement.querySelector('.card__like-count')
    likesCountElement.textContent = cardData.likes.length
    
    // Настраиваем кнопку удаления
    const deleteButton = cardElement.querySelector('.card__delete-button')
    if (cardData.owner._id !== profileId) {
        deleteButton.style.display = 'none'
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCallback(cardElement, cardData._id)
        })
    }
    
    // Настраиваем кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button')
    // Проверяем, был ли лайк ранее
    const isLiked = cardData.likes.some(like => like._id === profileId)
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active')
    }
    
    likeButton.addEventListener('click', () => {
        likeCallback(cardElement, cardData)
    })
    
    // Добавляем обработчик клика по изображению
    cardImage.addEventListener('click', () => imageClickCallback(cardData))
    
    return cardElement
}

// Функция клонирования карточки
function getCardTemplate() {
    const cardTemplate = document.querySelector('#card-template').content
    return cardTemplate.querySelector('.card').cloneNode(true)
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
export function likeCardHandler(cardElement, cardData) {
    const likeButton = cardElement.querySelector('.card__like-button')
    const isLiked = likeButton.classList.contains('card__like-button_is-active')
    toggleCardLike(cardData._id, isLiked)
        .then(updatedCard => {
            // Обновляем состояние лайка
            likeButton.classList.toggle('card__like-button_is-active')
            // Обновляем количество лайков
            const likesCountElement = cardElement.querySelector('.card__like-count')
            if (likesCountElement) {
                likesCountElement.textContent = updatedCard.likes.length
            }
        })
        .catch(error => {
            console.error('Ошибка ui при изменении лайка:', error)
        })
}
