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

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction; // перезаписали на новый коллбэк
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector(".form");
    console.log(form);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      // deleteThisCard(item);
      this.close();
      // cardElement.remove();
      // cardElement = null;
    })
  };



  close() {
    super.close();
    console.log('закрыто')
  };


}