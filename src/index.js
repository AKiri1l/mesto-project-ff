import './pages/index.css';
import { initialCards } from './scripts/cards';
import {createCard, removeCard, likeCard} from './components/card'
import { openPopup as openModal, closePopup as closeModal } from './components/modal';

// @todo: DOM узлы
const itemList = document.querySelector('.places__list');
const profileButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const currentName = document.querySelector('.profile__title');
const currentDescription = document.querySelector('.profile__description');
const profileFormElement = document.forms.editProfile;
const name = profileFormElement.elements.name;
const description = profileFormElement.elements.description;
const cardForm = document.forms.newPlace;

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    itemList.append(createCard(element, removeCard, likeCard, openImagePopup));
});

profileButton.addEventListener('click', () => {
    name.value = currentName.textContent;
    description.value = currentDescription.textContent;
    openModal(profilePopup)
});
cardAddButton.addEventListener('click', () => openModal(newCardPopup));
/*
profilePopup.addEventListener('click', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});
newCardPopup.addEventListener('click', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});
imagePopup.addEventListener('click', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});

profilePopup.addEventListener('keydown', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});
newCardPopup.addEventListener('keydown', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});
imagePopup.addEventListener('keydown', evt => {
    closeModal(evt.target.closest('.popup'), evt);
});
*/
profileFormElement.addEventListener('submit', handleFormSubmit); 
cardForm.addEventListener('submit', addCard); 

/*------------------------------Редактирование профиля----------------*/
function handleFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = name.value;
    currentDescription.textContent = description.value;
    closeModal(profilePopup);
}

/*-------------------------------Добавление карточки------------------*/
function addCard(evt) {
    evt.preventDefault();
    const cardName = cardForm.elements.placeName.value;
    const cardLink = cardForm.elements.link.value;
    itemList.prepend(createCard({name: cardName, link: cardLink}, removeCard, likeCard, openImagePopup));
    closeModal(cardForm, evt);
    cardForm.reset();
}

/*------------------Попап картчоки--------------------------*/
function openImagePopup(event) {
    const image = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    image.src = event.target.src;
    image.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;
    openModal(imagePopup);
}