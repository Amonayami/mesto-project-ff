// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardData.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardElement);
    });
  
    // Добавляем обработчик лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCardHandler);
  
    return cardElement;
  }
  
  // Функция удаления карточки
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  //Функция-заглушка под API-запрос
  export function likeCardHandler(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }