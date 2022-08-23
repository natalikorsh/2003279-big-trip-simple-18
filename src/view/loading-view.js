import { createElement } from '../render';

const createLoadingTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class LoadingView {
  #element = null;

  get template() {
    return createLoadingTemplate();
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
