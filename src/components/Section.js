export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

addItem(element) {
    this._containerSelector.append(element);
  }

newItem(element) {
  this._containerSelector.prepend(element);
} 

renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}