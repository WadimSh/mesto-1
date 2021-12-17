const userName = document.querySelector('.profile__name');
const userProf = document.querySelector('.profile__prof');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')

const popupFormEdit = document.querySelector('.popup_type_profile');
const closeButton = popupFormEdit.querySelector('.popup__close-button');
const inputForm = popupFormEdit.querySelector('.popup__form');
const inputName = popupFormEdit.querySelector('.popup__input_type_name');
const inputProf = popupFormEdit.querySelector('.popup__input_type_prof');

const popupFormAdd = document.querySelector('.popup_type_card');
const closeButtonAdd = popupFormAdd.querySelector('.popup__close-button');


function openPopupProfile() {
    popupFormEdit.classList.add('popup_opened');
	inputName.value = userName.textContent;
	inputProf.value = userProf.textContent;
}

function closePopupProfile() {
    popupFormEdit.classList.remove('popup_opened');
}

function formSubmitHandlerProfile(evt) {
	evt.preventDefault(); 
	userName.textContent = inputName.value;
	userProf.textContent = inputProf.value;
	closePopupProfile();
}

function openPopupProfileAdd() {
    popupFormAdd.classList.toggle('popup_opened');
}

function closePopupProfileAdd() {
    popupFormAdd.classList.toggle('popup_opened');
}


editButton.addEventListener('click', openPopupProfile);
closeButton.addEventListener('click', closePopupProfile);
inputForm.addEventListener('submit', formSubmitHandlerProfile);
addButton.addEventListener('click', openPopupProfileAdd);
closeButtonAdd.addEventListener('click', closePopupProfileAdd);