// Импорты
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCardHandler} from './card.js';
import {openPopup, closePopup} from './modal.js';
import '../pages/index.css';

// Получение DOM-элементов
const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const editForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const newCardForm = document.forms['new-place'];
const nameCardInput = newCardForm.elements['place-name'];
const linkCardInput = newCardForm.elements['link'];
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

//Плавная анимация попапов
popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

// Обработчик клика по изображению
function handleCardImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

//Добавление новой карточки
function renderCard(cardData, container, prepend = false) {
    const cardElement = createCard(cardData, deleteCard, likeCardHandler, handleCardImageClick);
    if (prepend) {
        container.prepend(cardElement);
    } else {
        container.appendChild(cardElement);
    }
}

// Инициализация карточек
initialCards.forEach(cardData => renderCard(cardData, placesList));

// Навешивание обработчиков событий
// Кнопка редактирования
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editPopup);
});

// Кнопка добавления
addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

// Закртытие попапов по крестику и фону
popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popup));
    
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

// Обработчики форм
// Форма профиля
editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
});

// Форма новой карточки
newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = {
        name: nameCardInput.value,
        link: linkCardInput.value
    };
    initialCards.unshift(newCard);
    renderCard(newCard, placesList, true);
    newCardForm.reset();
    closePopup(newCardPopup);
});