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
    this._popup.querySelector(".popup__image").src = this._cardData.link;
    this._popup.querySelector(".popup__image").alt = `Изображение: ` + this._cardData.name;
  }

}