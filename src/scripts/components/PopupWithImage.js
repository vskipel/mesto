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
    super.open();
    this._popup.querySelector(".popup__subtitle").textContent = this._cardData.name;
    const imagePopup = this._popup.querySelector(".popup__image")
    imagePopup.src = this._cardData.link;
    imagePopup.alt = `Изображение: ` + this._cardData.name;
  }

}