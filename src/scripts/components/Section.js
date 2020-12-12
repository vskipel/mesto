export class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }
}