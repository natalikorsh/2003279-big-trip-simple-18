import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filterName, currentFilterType) => {
    return (
      `<div class="trip-filters__filter">
          <input
          id="filter-${filterName}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filterName}"
          ${filterName === currentFilterType ? 'checked' : ''}
          />
          <label
          class="trip-filters__filter-label"
          for="filter-${filterName}">${filterName}</label>
        </div>`
    );
  };

  const createFilterTemplate = (filterItems, currentFilterType) => {
    const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

    return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  }

export default class FilterView extends AbstractView {
  #currentFilterType = null;
  #filters = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
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

