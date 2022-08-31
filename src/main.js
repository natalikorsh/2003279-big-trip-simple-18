import RoutePresenter from './presenter/route-presenter';
import PointsModel from './model/point-model.js';

const routeFilterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const routePresenter = new RoutePresenter(routeContainer, pointsModel, routeFilterContainer);


routePresenter.init();
