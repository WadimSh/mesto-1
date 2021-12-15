const popupForm = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const inputForm = document.querySelector('.popup__form');
const userName = document.querySelector('.profile__name');
const userProf = document.querySelector('.profile__prof');
const inputName = document.querySelector('#popup__name');
const inputProf = document.querySelector('#popup__prof');

function openPopup() {
    popupForm.classList.add('popup_opened');
}

function closePopup() {
    popupForm.classList.remove('popup_opened');
	inputName.value = userName.textContent;
	inputProf.value = userProf.textContent;
}

function formSubmitHandler (evt) {
	evt.preventDefault(); 
	userName.textContent = inputName.value;
	userProf.textContent = inputProf.value;
	closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
inputForm.addEventListener('submit', formSubmitHandler);