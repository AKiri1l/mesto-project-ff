export function OpenPopup(popup) {
    popup.classList.add('popup_is-opened');
};

export function ClosePopup(popup, evt) {
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button') || (evt.target == evt.currentTarget) || (evt.key == "Escape")){
        popup.classList.remove('popup_is-opened');
    }
}
