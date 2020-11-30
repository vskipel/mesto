import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
    
  }
  open(item) {
    super.open();
    this._popup.querySelector(".popup__subtitle").textContent = item.name;
    const imagePopup = this._popup.querySelector(".popup__image")
    imagePopup.src = item.link;
    imagePopup.alt = `Изображение: ` + item.name;
  }

}