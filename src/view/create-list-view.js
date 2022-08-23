import {createElement} from '../render.js';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class CreateListView {
  #element = null;

  get template() {
    return createListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
