import AbstractView from '../framework/view/abstract-view.js';

const createLoadingTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
