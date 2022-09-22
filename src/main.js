import RoutePresenter from './presenter/route-presenter';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';
import { render } from './framework/render';



const routeFilterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(routeFilterContainer, filterModel, pointsModel);

const routePresenter = new RoutePresenter(routeContainer, pointsModel, filterModel);

filterPresenter.init();
routePresenter.init();
