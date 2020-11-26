export class Popup {
  constructor(
    popupSelector
  ) {
    this._popup = popupSelector;
  }

  _handleEscClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
      this.close();
    };
  }

  _handleOverlayClose(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.target === evt.currentTarget) {
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
    console.log('close!!')
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-icon");
    closeButton.addEventListener('click', () => this.close());
    
  }
}