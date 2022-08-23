import { generatePoint, destinations, offersByType } from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({length: 0}, generatePoint);

  get points() {
    return this.#points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destinationId),
      offers: offersByType.find((offers) => offers.type === point.type).offers,
    }));
  }
}

