import dayjs from 'dayjs';
import { FilterType } from '../const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const humanizeFormDate = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');
export const humanizePointDate = (date) => dayjs(date).format('MMM D');
export const humanizePointTime = (date) => dayjs(date).format('HH:mm');
export const robotizeDate = (date) => dayjs(date).format('YYYY-MM-DD');
export const robotizeDateAndTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB, 'D');
export const isPriceEqual = (priceA, priceB) => priceA === priceB;

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const filterPoints = (filterType, points) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
      break;
    case FilterType.FUTURE:
      return points.filter((point) =>
      Date.parse(point.dateFrom) > Date.now());
      break;
  };
};

