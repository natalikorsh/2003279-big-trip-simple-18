import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeFormDate = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');
const humanizePointDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH:mm');
const robotizeDate = (date) => dayjs(date).format('YYYY-MM-DD');
const robotizeDateAndTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDay = (pointA, pointB) => {
  const weight = getWeightForDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export {getRandomInteger, humanizeFormDate, humanizePointDate, humanizePointTime, robotizeDate, robotizeDateAndTime, updateItem, sortByDay, sortByPrice};

