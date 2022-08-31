import { getRandomInteger } from '../utils/utils.js';
import { ROUTE_TYPES } from '../const.js';
import { nanoid } from 'nanoid';

export const generateOffersByType = (type) => {
  const offersByType = [
    {
      type: 'taxi',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'train',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'bus',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'ship',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'drive',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'check-in',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'sightseeing',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'restaurant',
      offers: [
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        },
        {
          id: 1,
          title: 'Order Uber',
          price: 20,
        }
      ]
    },
    {
      type: 'flight',
      offers: [
        {
          id: 1,
          title: 'Choose seats',
          price: 5,
        },
        {
          id: 2,
          title: 'Add luggage',
          price: 30,
        },
        {
          id: 3,
          title: 'Switch to comfort',
          price: 100,
        },
        {
          id: 4,
          title: 'Add meal',
          price: 15,
        },
        {
          id: 5,
          title: 'Travel by train',
          price: 40,
        },
      ]
    },
  ];

  return offersByType.find((offers) => offers.type === type).offers;

};

const generateDestinationById = (id) => {
  const destinations = [
    {
      id: 1,
      cityName: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          'src': 'http://picsum.photos/300/200?r=0.093756202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093356202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.099378939202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093773890202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093226202',
          'description': 'Chamonix parliament building'
        },
      ]
    },
    {
      id: nanoid(),
      cityName: 'Chamonix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
      pictures: [
        {
          'src': 'http://picsum.photos/300/200?r=0.093756202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093356202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.099378939202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093773890202',
          'description': 'Chamonix parliament building'
        },
        {
          'src': 'http://picsum.photos/300/200?r=0.093226202',
          'description': 'Chamonix parliament building'
        },
      ]
    },
  ];

  return destinations.find((destination) => destination.id === id);
};

// const generateDate = () => {
//   const isDate = Boolean(getRandomInteger(0, 1));
//   if (!isDate) {
//     return null;
//   }

//   // const maxDaysGap = 7;
//   // const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
//   // return dayjs().add(daysGap, 'day').toDate();
// }

const generateType = () => {
  const randomIndex = getRandomInteger(0, ROUTE_TYPES.length - 1);
  return ROUTE_TYPES[randomIndex];
};

export const generatePoint = () => {
  const id = 1;
  const type = generateType();
  const destination = generateDestinationById(id);
  const dateFrom = 11111;
  const dateTo = 22222;
  const basePrice = getRandomInteger(1, 9) * 100;
  const offers = generateOffersByType(type);

  return {
    id: nanoid(),
    type,
    descriptionText: destination.description,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    cityName: destination.cityName,
    pictures: destination.pictures
  };
};
