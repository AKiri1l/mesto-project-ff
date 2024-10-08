// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
// @todo: DOM узлы
const item__List = document.querySelector('.places__list');
// @todo: Функция создания карточки
function add(item) {
    const templateElement = template.querySelector('.card').cloneNode(true);
    const cardImage = templateElement.querySelector('.card__image');
    const cardContent = templateElement.querySelector('.card__title');
    cardImage.src = item.link;
    cardContent.textContent = item.name;

    const deleteButton = templateElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    item__List.append(templateElement);
}
// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    add(element);
});