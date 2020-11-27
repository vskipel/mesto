import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector, cardData) {
    super(popupSelector);
    this._popup = popupSelector;
    this._cardData = cardData;
	}
  open() {
    this._popup.classList.add("popup_opened");
    this._popup.querySelector(".popup__subtitle").textContent = this._cardData.name;
    this._popup.querySelector(".popup__image").src = this._cardData.link;
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));

    
  }

}