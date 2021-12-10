const popupForm = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const inputForm = document.querySelector('.popup__form');
const userName = document.querySelector('.profile__name');
const userProf = document.querySelector('.profile__prof');

let inputName = document.querySelector('.popup__name');
let inputProf = document.querySelector('.popup__prof');

function openPopup() {
    popupForm.classList.remove('popup_opened');
}

function closePopup() {
    popupForm.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
	evt.preventDefault(); 
	userName.textContent = inputName.value;
	userProf.textContent = inputProf.value;
	closePopup();
}

inputName.value = userName.textContent;
inputProf.value = userProf.textContent;

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
inputForm.addEventListener('submit', formSubmitHandler);