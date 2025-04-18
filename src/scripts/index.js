//Импорты
import {initialCards} from './cards.js';
import '../pages/index.css';

// Взаимодействия с карточками
// Функция создания карточки
function createCard(cardData, deleteCallback, likeCallback) {
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
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
    if (likeCallback) likeCallback(cardData);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Функция-заглушка под API-запрос
function likeCardHandler(cardData) {
  
}

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
const placesList = document.querySelector('.places__list');
initialCards.forEach(cardData => renderCard(cardData, placesList, false, likeCardHandler));


//Открытие и закрытие модального окна
//Выбираем кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageButtons = document.querySelectorAll('.card__image');

//Выбиравем попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//Закрытие по esc
function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//Открытие попапов
function openPopup(popup) {
  if (popup === editPopup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);
}

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
}

//Добавляем обработчики событий
document.addEventListener('click', (evt) => {
  // Открытие попапа редактирования
  if (evt.target.closest('.profile__edit-button')) {
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

//Редактирование имени и информации о себе
// Находим форму редактирования профиля
const editForm = document.forms['edit-profile'];

// Находим элементы откуда вставляють данные профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Находим элементы куда вставляють данные профиля
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

// Обработчик отправки формы редактирования
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
});

//Добавление новой карточки
// Находим форму карточек
const newCardForm = document.forms['new-place'];

// Находим элементы куда вставляють данные карточек
const nameCardInput = newCardForm.elements['place-name'];
const linkCardInput = newCardForm.elements['link'];

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
