import '../pages/index.css'
import {createCard, deleteCards, likeCardHandler} from './card.js'
import {openPopup, closePopup} from './modal.js'
import {validationConfig, enableValidation, clearValidation} from './validation.js'
import {getProfile, getCards, updateProfile, addNewCard} from './api.js'

enableValidation(validationConfig)

// Получение DOM-элементов
const placesList = document.querySelector('.places__list')
const editPopup = document.querySelector('.popup_type_edit')
const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')
const popupImage = imagePopup.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')
const editForm = document.forms['edit-profile']
const nameInput = editForm.elements.name
const jobInput = editForm.elements.description
const newCardForm = document.forms['new-place']
const nameCardInput = newCardForm.elements['place-name']
const linkCardInput = newCardForm.elements['link']
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const popups = document.querySelectorAll('.popup')
const profileImage = document.querySelector('.profile__image')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
let profileId;

//Загрузка профиля
const loadProfile = () => {
    getProfile()
    .then((profileData) => {
        profileName.textContent = profileData.name
        profileJob.textContent = profileData.about
        profileImage.src = profileData.avatar
        profileId = profileData._id
        return profileData
    })
    .catch((error) => {
        console.log('Ошибка ui профиля:', error)
    })
}

loadProfile()

//Загрузка карточек
Promise.all([getProfile(), getCards()])
    .then(([profileData, cards]) => {
        profileId = profileData._id
        placesList.innerHTML = ''
        cards.forEach((cardData) => {
            renderCard(cardData, placesList, false, profileId)
        })
    })
    .catch((error) => {
        console.log('Ошибка ui карточек:', error)
    })


// Обновление профиля
editForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const originalName = profileName.textContent
    const originalJob = profileJob.textContent
    
    updateProfile(nameInput.value, jobInput.value)
        .then((updateProfileData) => {
            profileName.textContent = updateProfileData.name
            profileJob.textContent = updateProfileData.about
            closePopup(editPopup)
        })
        .catch((error) => {
            profileName.textContent = originalName
            profileJob.textContent = originalJob
            console.log('Ошибка ui обновления профиля:', error)
        })
})

//Добавляем новую карточку
newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault()   
    addNewCard(nameCardInput.value, linkCardInput.value)
        .then((newCard) => {
            renderCard(newCard, placesList, false, profileId)
            newCardForm.reset()
            closePopup(newCardPopup)
        })
        .catch((error) => {
            console.log('Ошибка ui при добавлении новой карточки:', error)
        })
})

//Плавная анимация попапов
popups.forEach(popup => {
    popup.classList.add('popup_is-animated')
})

// Обработчик клика по изображению
function handleCardImageClick(cardData) {
  popupImage.src = cardData.link
  popupImage.alt = cardData.name
  popupCaption.textContent = cardData.name
  openPopup(imagePopup)
}

//Добавление новой карточки
function renderCard(cardData, container, prepend = false, profileId) {
    const cardElement = createCard(cardData, deleteCards, (evt) => likeCardHandler(evt, cardData), handleCardImageClick, profileId)
    if (prepend) {
        container.prepend(cardElement)
    } else {
        container.appendChild(cardElement)
    }
}

// Навешивание обработчиков событий
// Кнопка редактирования
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    clearValidation(editForm, validationConfig)
    openPopup(editPopup)
});

// Кнопка добавления
addButton.addEventListener('click', () => {
    clearValidation(newCardPopup, validationConfig)
    openPopup(newCardPopup)
});

// Закртытие попапов по крестику и фону
popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close')
    closeButton.addEventListener('click', () => closePopup(popup))
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closePopup(popup)
        }
    })
})
