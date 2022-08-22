export const offersByType = [
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

export const destinations = [
  {
    id: 1,
    cityName: 'Chamonix',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    pictures: [
      {
        'src': `http://picsum.photos/300/200?r=0.093756202`,
        'description': 'Chamonix parliament building'
      },
      {
        'src': `http://picsum.photos/300/200?r=0.093356202`,
        'description': 'Chamonix parliament building'
      },
      {
        'src': `http://picsum.photos/300/200?r=0.099378939202`,
        'description': 'Chamonix parliament building'
      },
      {
        'src': `http://picsum.photos/300/200?r=0.093773890202`,
        'description': 'Chamonix parliament building'
      },
      {
        'src': `http://picsum.photos/300/200?r=0.093226202`,
        'description': 'Chamonix parliament building'
      },
    ]
  },
];

export const generatePoint = () => ({
  id: 1,
  type: 'flight',
  destinationId: 1,
  dateFrom: '2019-03-19T13:28:36.378Z',
  dateTo: '2019-03-20T17:33:36.378Z',
  basePrice: 100,
  offers: offersByType,
});





