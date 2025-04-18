//Импорты
import {initialCards, createCard, deleteCard, likeCardHandler} from './cards.js';
import {openPopup, closePopup} from './modal.js';
import '../pages/index.css';

//Выбираем список карточек
const placesList = document.querySelector('.places__list');
//Выбиравем попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
// Находим форму редактирования профиля
const editForm = document.forms['edit-profile'];
// Находим элементы откуда вставляють данные профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// Находим элементы куда вставляють данные профиля
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
// Находим форму карточек
const newCardForm = document.forms['new-place'];
// Находим элементы куда вставляють данные карточек
const nameCardInput = newCardForm.elements['place-name'];
const linkCardInput = newCardForm.elements['link'];

//Функция добавления карточки
function renderCard(cardData, container, prepend = false, likeCallback) {
  const cardElement = createCard(cardData, deleteCard, likeCallback);
  if (prepend) {
    container.prepend(cardElement);
  } else {
    container.appendChild(cardElement);
  }
}

// Вывести карточки на страницу
initialCards.forEach(cardData => renderCard(cardData, placesList, false, likeCardHandler));

//Добавляем обработчики событий
document.addEventListener('click', (evt) => {
  // Открытие попапа редактирования
  if (evt.target.closest('.profile__edit-button')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editPopup);
  }
  
  // Открытие попапа добавления
  else if (evt.target.closest('.profile__add-button')) {
    openPopup(newCardPopup);
  }
  
  // Открытие попапа с изображением
  else if (evt.target.closest('.card__image')) {
    const image = evt.target.closest('.card__image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt || '';
    openPopup(imagePopup);
  }
  
  // Закрытие на крестик
  else if (evt.target.closest('.popup__close')) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  }
});

// Закрытие на фон
[editPopup, newCardPopup, imagePopup].forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик отправки формы редактирования
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

// Обработчик отправки новой карточки
newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  //Создаем объект новой карточки и добавляем в начало массива
  const newCard = {
    name: nameCardInput.value,
    link: linkCardInput.value
  };
  initialCards.unshift(newCard);
  renderCard(newCard, placesList, true, likeCardHandler);
  newCardForm.reset();
  closePopup(newCardPopup);
});
