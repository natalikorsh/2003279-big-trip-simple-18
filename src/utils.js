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

export {getRandomInteger, humanizeFormDate, humanizePointDate, humanizePointTime, robotizeDate, robotizeDateAndTime};

