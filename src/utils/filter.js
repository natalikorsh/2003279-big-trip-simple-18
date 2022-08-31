import { FilterType } from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: points,
  [FilterType.FUTURE]: (points) => points.filter((point) => {
    let today = new Date();
    if (point.dateFrom >= today) {
      return true;
    };
   }),
}
