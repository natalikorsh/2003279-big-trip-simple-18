import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, humanizePointTime, robotizeDate, robotizeDateAndTime } from '../utils/utils.js';

const createRoutePointTemplate = (point) => {
  const {type, dateFrom, dateTo, cityName, basePrice, offers} = point;

  const dateStart = humanizePointDate(dateFrom);
  const timeStart = humanizePointTime(dateFrom);
  const timeEnd = humanizePointTime(dateTo);
  const dateForRobots = robotizeDate(dateFrom);
  const startDateAndTimeForRobots = robotizeDateAndTime(dateFrom);
  const endDateAndTimeForRobots = robotizeDateAndTime(dateTo);
  const currentOffers = offers.find((offer) => offer.type === type).offers;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateForRobots}">${dateStart}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type[0].toUpperCase()}${type.slice(1)} ${cityName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateAndTimeForRobots}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateAndTimeForRobots}">${timeEnd}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">

          ${currentOffers.map(({title, price}) => `<li class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </li>` ).join('')}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class RoutePointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createRoutePointTemplate(this.#point);
  }

  setPointExpandHandler = (callback) => {
    this._callback.expand = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#expandHandler);
  };

  #expandHandler = () => {
    this._callback.expand();
  };
}

