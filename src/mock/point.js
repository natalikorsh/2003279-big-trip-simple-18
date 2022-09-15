import { getRandomInteger } from '../utils/utils.js';
import { ROUTE_TYPES } from '../const.js';

const OFFERS_BY_TYPE = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
        price: 20,
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Order uber',
        price: 20,
      },
      {
        id: 2,
        title: 'Order uber',
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

const DESTINATIONS = [
  {
    id: 1,
    cityName: 'Chamonix',
    description: 'Chamonix-Mont-Blanc, more commonly known as Chamonix,[b][c] is a commune in the Haute-Savoie department in the Auvergne-Rhône-Alpes region of southeastern France. It was the site of the first Winter Olympics in 1924. In 2017, it had a population of 8,611.',
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.09111112',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.09322202',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.09333202',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.444444202',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0944442',
        'description': 'Chamonix parliament building'
      },
    ]
  },
  {
    id: 2,
    cityName: 'Geneva',
    description: 'Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. Situated in the south west of the country, where the Rhône exits Lake Geneva, it is the capital of the Republic and Canton of Geneva.',
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.088856202',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.077772',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.099388939202',
        'description': 'Chamonix parliament building'
      },
    ]
  },
  {
    id: 3,
    cityName: 'Amsterdam',
    description: 'Amsterdam is the capital and most populous city of the Netherlands; with a population of 907,976 within the city proper, 1,558,755 in the urban area and 2,480,394 in the metropolitan area. Found within the Dutch province of North Holland, Amsterdam is colloquially referred to as the "Venice of the North", due to the large number of canals which form a UNESCO World Heritage Site.',
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.093756123',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0933111',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0993789392222',
        'description': 'Chamonix parliament building'
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0937738555',
        'description': 'Chamonix parliament building'
      },
    ]
  },
];

const generateCity = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex].cityName;
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, ROUTE_TYPES.length - 1);
  return ROUTE_TYPES[randomIndex];
};

export const generatePoint = () => {
  const cityName = generateCity();
  const type = generateType();
  const dateFrom = '2017-02-26T19:40:03.243Z';
  const dateTo = '2017-02-27T01:25:03.243Z';
  const basePrice = getRandomInteger(1, 9) * 100;
  const offers = OFFERS_BY_TYPE;
  const destinations = DESTINATIONS;

  return {
    type,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    destinations,
    cityName
  };
};
