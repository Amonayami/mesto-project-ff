//Открытие попапов
export function openPopup(popup) {
    //Плавная анимация попапов
    popup.classList.add('popup_is-animated');
    popup.offsetHeight;
  
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscape);
  }
  
  //Закрытие попапа
  export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscape);
  }

  //Закрытие по esc
function closeEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }