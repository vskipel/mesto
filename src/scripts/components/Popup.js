import {
  escButton
} from '../utils/constants.js';

export class Popup {
  constructor(
    popupSelector
  ) {
    this._popup = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === escButton) {
      const openedPopup = document.querySelector(".popup_opened");
      this.close();
    };
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      const openedPopup = document.querySelector(".popup_opened");
      this.close();
    };
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-icon");
    closeButton.addEventListener('click', () => this.close());
  }
}