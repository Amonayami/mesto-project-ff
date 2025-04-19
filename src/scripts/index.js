//Импорты
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCardHandler} from './card.js';
import {openPopup, closePopup} from './modal.js';
import '../pages/index.css';

//Выбираем список карточек
const placesList = document.querySelector('.places__list');
//Выбиравем попапы
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
//Элементы попапов изображения
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
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
function renderCard(cardData, container, prepend = false) {
  const cardElement = createCard(cardData, deleteCard, likeCardHandler, imageClick);
  if (prepend) {
    container.prepend(cardElement);
  } else {
    container.appendChild(cardElement);
  }
}

// Вывести карточки на страницу
initialCards.forEach(cardData => renderCard(cardData, placesList, false));

// Обработчик клика по изображению карточки
function imageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// Открытие попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

// Закрытия попапов
popups.forEach((popup) => {
  // Закрытие по крестику
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(popup));
  
  // Закрытие по оверлею
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
