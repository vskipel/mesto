import {
  escButton
} from '../utils/constants.js';

export class Popup {
  constructor(
    popupSelector
  ) {
    this._popup = popupSelector;
    this.handleEscClose = this.handleEscClose.bind(this);
    this.handleOverlayClose = this.handleOverlayClose.bind(this);

  }

  handleEscClose(evt) {
    if (evt.key === escButton) {
      this.close();
    };
  }

  handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this.handleEscClose);
    this._popup.addEventListener('click', this.handleOverlayClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this.handleEscClose);
    this._popup.removeEventListener('click', this.handleOverlayClose);
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-icon");
    closeButton.addEventListener('click', () => this.close());
  }
}