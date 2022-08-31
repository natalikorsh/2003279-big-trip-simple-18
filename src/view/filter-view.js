import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }

  setFilterValue (event) {
    const { value, checked } = event.target;

    this.value = value;
    this.checked = checked;
  }
  
  // setFilterCheckedHandler = (callback) => {
  //   this._callback.filterApply() = callback;
  //   this.element.querySelector('trip-filters__filter-input').addEventListener('change', this.#filterCheckedHandler);
  // }

  // #filterCheckedHandler = (evt) => {
  //   evt.preventDefault();
  //   this.eventName = evt.target.value;
  //   this._callback.filterApply(this.eventName);
  // }
}

