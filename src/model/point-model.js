import { generatePoint, destinations, offersByType } from "../mock/point.js";

export default class PointsModel {
  get() {
    const points = Array.from({length: 3}, generatePoint);

    return points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destinationId),
      offers: offersByType.find((offers) => offers.type === point.type).offers,
    }));
  }
}

