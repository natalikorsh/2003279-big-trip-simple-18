import { ROUTE_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFormDate } from '../utils/utils.js';
import { CITY_NAMES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createRouteTypesList = (routeTypes) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${routeTypes.map(routeType => {
        return `<div class="event__type-item">
        <input id="event-type-${routeType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${routeType}">
        <label class="event__type-label  event__type-label--${routeType}" for="event-type-${routeType}-1">${routeType[0].toUpperCase()}${routeType.slice(1)}</label>
      </div>`}).join(' ')}

    </fieldset>
  </div>`
);

const createDestinationTemplate = (type, cityName, cityNames) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${cityNames.map(city => {
      return `<option value="${city[0].toUpperCase()}${city.slice(1)}" data-city-name="${city}"></option>`
    }).join('')}

    </datalist>
  </div>`
);

const createOffersTemplate = (offersByType, type) => {
  const offers = offersByType.find((offers) => offers.type === type).offers;

  return (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${offers.map(({title, price, id}) => {
    const offerNameArray = title.split(' ');
    const offerName = offerNameArray.pop();
    const checked = offers.includes(offers.id) ? 'checked' : '';

    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${id}" type="checkbox" name="event-offer-${offerName}" ${checked}>
      <label class="event__offer-label" for="event-offer-${offerName}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
      </div>`}).join('')}

    </div>
  </section>`
)};

const createDescriptionTemplate = (destinations, city) => {
  const destination = destinations.find((destination) => destination.cityName === city);
  const { description, pictures } = destination;
return (
  `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
          </div>
        </div>
      </section>`
)};

const createEditFormTemplate = (data) => {
  const {type, cityName, destinations, dateFrom, dateTo, offers, basePrice} = data;

  const dateStart = humanizeFormDate(dateFrom);
  const dateEnd = humanizeFormDate(dateTo);

  const routeTypesList = createRouteTypesList(ROUTE_TYPES);
  const destinationTemplate = createDestinationTemplate(type, cityName, CITY_NAMES);
  const offersTemplate = createOffersTemplate(offers, type);
  const descriptionTemplate = createDescriptionTemplate(destinations, cityName);

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        ${routeTypesList}

      </div>

      ${destinationTemplate}

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">

      ${offersTemplate}

      ${descriptionTemplate}
    </section>
  </form>
</li>`);
};


export default class EditFormView extends AbstractStatefulView {
  #datepicker = null;

  constructor(point) {
    super();
    this._state = EditFormView.parseFormToState(point);

    this.#setInnerHandlers();
    this.#setDatepickerStartDate();
    this.#setDatepickerEndDate();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      EditFormView.parseFormToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToForm(this._state));
  };

  setFormResetHandler = (callback) => {
    this._callback.formReset = callback;
    this.element.querySelector('form').addEventListener('reset', this.#formResetHandler);
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  };

  setRollupHandler = (callback) => {
    this._callback.rollup = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupHandler);
  };

  #rollupHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollup();
  };


  setChangeTypeHandler = () => {
    // навесить обработчик смены типа маршрута
  }

  #changeTypeHandler = () => {
    // логика обработчика смены типа маршрута
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#cityNameHandler);
  };

  #typeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #cityNameHandler = (evt) => {
    this.updateElement({
      cityName: evt.target.value,
    });
  };

  #dateStartChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
  };

  #dateEndChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo,
    });
  };

  #setDatepickerStartDate = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateStartChangeHandler,
      },
    );
  };

  #setDatepickerEndDate = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateEndChangeHandler,
      },
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setRollupHandler(this._callback.rollup);
    this.#setDatepickerStartDate();
    this.#setDatepickerEndDate();
  };

  static parseFormToState = (point) => ({
    ...point,
  });

  static parseStateToForm = (state) => {
    const point = {...state};
    return point;
  };
}
