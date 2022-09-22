import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createFilterTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-${FilterType.EVERYTHING}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${FilterType.EVERYTHING}">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-${FilterType.FUTURE}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${FilterType.FUTURE}">Future</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #currentFilterType = null;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    this._callback.filterTypeChange(evt.target.value);
    console.log(evt.target.value);
  }
}

