export function openPopup(popup) {
    if (popup) {
        popup.addEventListener('click', handleClosePopup);
        popup.addEventListener('keydown', handleClosePopup);
        popup.classList.add('popup_is-opened');
    }
}

function handleClosePopup(evt) {
    console.log(evt.target);
    console.log(evt.currentTarget);
    if (evt.target.classList.contains('popup__close')  || evt.target === evt.currentTarget || evt.key === 'Escape') {    
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);                         
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');    
    popup.removeEventListener('click', handleClosePopup);
    popup.removeEventListener('keydown', handleClosePopup);
}
