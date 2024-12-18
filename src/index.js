import './pages/index.css';
import {createCard} from './components/card'
import { openPopup as openModal, closePopup as closeModal } from './components/modal';
import {enableValidation, clearValidation} from './components/validation.js'
import { getUser, getCards, updateProfile, setCard, deleteCard, setLike, deleteLike, updateAvatar } from './components/api.js';

const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-invalid',
    errorClass: 'popup__error_visible'
  }

// @todo: DOM узлы
const itemList = document.querySelector('.places__list');
/*-----------узлы для редактирования профиля----------*/
const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const cardAddButton = document.querySelector('.profile__add-button');
const currentName = document.querySelector('.profile__title');
const currentDescription = document.querySelector('.profile__description');
const currentAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_update_profile');
const profileFormElement = document.forms.editProfile;
const name = profileFormElement.elements.name;
const description = profileFormElement.elements.description;
const profileInputList = Array.from(profilePopup.querySelectorAll('.popup__input'));
const avatarForm = document.forms.newAvatar;
const avatar = avatarForm.querySelector('.popup__input_type_url');

/*-----------узлы для добавления места----------*/
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.forms.newPlace;
const place = cardForm.querySelector('.popup__input_type_card-name');
const link = cardForm.querySelector('.popup__input_type_url');
const cardInputList = Array.from(newCardPopup.querySelectorAll('.popup__input'));
let userId;

/*-----------узлы для карточки----------*/
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        currentName.textContent = user.name;
        currentDescription.textContent = user.about;
        currentAvatar.style.backgroundImage = `url(${user.avatar})`;
        userId = user._id;
        cards.forEach(element => {
            itemList.append(createCard(element, deleteCard, setLike, deleteLike, openImagePopup, userId));
        });
    })
    .catch((err) => {
        console.log(err); 
      });

profileButton.addEventListener('click', () => {
    name.value = currentName.textContent;
    description.value = currentDescription.textContent;
    clearValidation(profilePopup, obj);
    openModal(profilePopup);
});
cardAddButton.addEventListener('click', () => {
    cardForm.reset();
    clearValidation(newCardPopup, obj);
    openModal(newCardPopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardForm.addEventListener('submit', addCard); 

currentAvatar.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarPopup, obj);
    openModal(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(true, evt.submitter)
    updateAvatar(avatar.value)
        .then(data => {
            currentAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .then(() => closeModal(avatarPopup))
        .catch((err) => {
            console.log(err); 
          })
        .finally(() => {
            renderLoading(false, evt.submitter);
        })
})

/*------------------------------Редактирование профиля----------------*/
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, evt.submitter);
    updateProfile(name.value, description.value)
        .then(res => {
            currentName.textContent = res.name;
            currentDescription.textContent = res.about;
        })
        .then(() => closeModal(profilePopup))
        .catch((err) => {
            console.log(err); 
          })
        .finally(() => {
            renderLoading(false, evt.submitter);
        })
}

/*-------------------------------Добавление карточки------------------*/
function addCard(evt) {
    evt.preventDefault();
    renderLoading(true, evt.submitter)
    const cardName = cardForm.elements.placeName.value;
    const cardLink = cardForm.elements.link.value;
    setCard(cardName, cardLink)
        .then(data => {
            itemList.prepend(createCard(data, deleteCard, setLike, deleteLike, openImagePopup, userId));
        })
        .then(() => closeModal(newCardPopup))
        .catch((err) => {
            console.log(err); 
          })
        .finally(() => {
            renderLoading(false, evt.submitter);
        })
}

/*------------------Попап картчоки--------------------------*/
function openImagePopup(event) {
    image.src = event.target.src;
    image.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;
    openModal(imagePopup);
}

/*-------------------Загрузка----------------------*/
function renderLoading(boolean, button) {
    if(boolean){
        button.textContent = 'Сохранение...';
    }else{
        button.textContent = 'Сохранить';
    }
}

enableValidation(obj);
