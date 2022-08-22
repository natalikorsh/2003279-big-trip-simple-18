import FilterView from './view/filter-view';
import PagePresenter from './presenter/page-presenter';
import { render } from './render';
import PointsModel from './model/point-model';

const pageFilterElement = document.querySelector('.trip-controls__filters');
const pageMainSection = document.querySelector('.trip-events');
const pagePresenter = new PagePresenter();
const pointsModel = new PointsModel();

render(new FilterView(), pageFilterElement);

pagePresenter.init(pageMainSection, pointsModel);
