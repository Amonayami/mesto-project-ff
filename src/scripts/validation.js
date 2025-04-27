//Конфиг валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

//Показывать ошибку
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(config.errorClass)
}

//Скрывать ошибку
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = ''
}

//Проверка валидности
const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorValue)
    } else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("")
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
        hideInputError(formElement, inputElement, config)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

//Блокировка / разблокировка кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true
        buttonElement.classList.add(config.inactiveButtonClass)
    } else {
        buttonElement.disabled = false
        buttonElement.classList.remove(config.inactiveButtonClass)
    }
}

//Вешаем обработчики
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
        })
    })
}

//Включение валидности
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        setEventListeners(formElement, config)
    })
}

// Очистка ошибок
export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputList.forEach((input) => {
      hideInputError(formElement, input, config)
      input.setCustomValidity('')
    })
    toggleButtonState(inputList, buttonElement, config)
};
