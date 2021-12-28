const configs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_activ'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(configs.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configs.errorClass)
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(configs.inputErrorClass);
    errorElement.classList.remove(configs.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
    const buttonElement = formElement.querySelector(configs.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
       inputElement.addEventListener('input', () => {
       checkInputValidity(formElement, inputElement);
       toggleButtonState(inputList, buttonElement);
     });
   });
 }; 

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
       buttonElement.classList.add(configs.inactiveButtonClass);
    } else {
       buttonElement.classList.remove(configs.inactiveButtonClass);
    }
}; 

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(configs.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      
      setEventListeners(formElement);
    });
}

enableValidation(); 