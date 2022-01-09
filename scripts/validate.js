const configs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_activ'
}

const showInputError = (formElement, inputElement, errorMessage, configs) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(configs.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configs.errorClass)
};

const hideInputError = (formElement, inputElement, configs) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(configs.inputErrorClass);
    errorElement.classList.remove(configs.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, configs) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configs);
    } else {
        hideInputError(formElement, inputElement, configs);
    }
};

const setEventListeners = (formElement, configs) => {
    const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
    const buttonElement = formElement.querySelector(configs.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, configs);
    inputList.forEach((inputElement) => {
       inputElement.addEventListener('input', () => {
       checkInputValidity(formElement, inputElement, configs);
       toggleButtonState(inputList, buttonElement, configs);
     });
   });
 }; 

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

const toggleButtonState = (inputList, buttonElement, configs) => {
    if (hasInvalidInput(inputList)) {
       buttonElement.setAttribute('disabled', 'disabled');
    } else {
       buttonElement.removeAttribute('disabled');
    }
}; 

const enableValidation = (configs) => {
    const formList = Array.from(document.querySelectorAll(configs.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      
      setEventListeners(formElement, configs);
    });
}

enableValidation(configs); 