import {
  Popup
} from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(
    popupSelector
  ) {
    super(popupSelector);
    this._popup = popupSelector;

  }

  setEventListeners(deleteThisCard, item, cardElement) {
    super.setEventListeners();
    const form = this._popup.querySelector(".form");
    console.log(form);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      deleteThisCard(item);
      this.close();
      cardElement.remove();
      cardElement = null;
    })
  };



  close() {
    super.close();
    console.log('закрыто')
  };


}