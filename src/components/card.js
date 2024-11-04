export function createCard(item, deleteFunction, likeFunction, popupFunction) {
    const template = document.querySelector('#card-template').content;
    const templateElement = template.querySelector('.card').cloneNode(true);
    const cardImage = templateElement.querySelector('.card__image');
    const cardContent = templateElement.querySelector('.card__title');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardContent.textContent = item.name;

    const deleteButton = templateElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteFunction);

    const likeButton = templateElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeFunction);

    const imageList = document.querySelector('.places__list');
    imageList.addEventListener('click', popupFunction);

    return templateElement;
}

export function removeCard(event) {
    event.target.closest('.card').remove();
}

export function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}