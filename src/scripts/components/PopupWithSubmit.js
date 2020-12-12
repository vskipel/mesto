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
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector(".form");
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  };

}