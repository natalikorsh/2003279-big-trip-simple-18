import FilterView from './view/filter-view.js';
import PagePresenter from './presenter/page-presenter.js';
import { render } from './framework/render.js';
import PointsModel from './model/point-model.js';

const pageFilterElement = document.querySelector('.trip-controls__filters');
const pageMainSection = document.querySelector('.trip-events');
const pagePresenter = new PagePresenter();
const pointsModel = new PointsModel();

render(new FilterView(), pageFilterElement);

pagePresenter.init(pageMainSection, pointsModel);
