export function createCard(item, deleteFunction, likeFunction, openImagePopup) {
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

    cardImage.addEventListener('click', openImagePopup);

    return templateElement;
}

export function removeCard(event) {
    event.target.closest('.card').remove();
}

export function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}