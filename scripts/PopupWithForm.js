import {
  Popup
} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit
  }) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
  }
  
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__item');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    console.log(this._formValues);
    return this._formValues;
    
  }


  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-icon");
    closeButton.addEventListener('click', () => this.close());
    const form = this._popup.querySelector(".form");
    
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      
    })
  }

  close() {
    this._popup.classList.remove("popup_opened");
    const form = this._popup.querySelector(".form");
    form.reset();
    console.log(form)
  }

}