import CreateListView from '../view/create-list-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FilterView from '../view/filter-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;
  #routeFilterContainer = null;

  #filters = new FilterView();
  #routeSortComponent = new SortView();
  #loadingView = new LoadingView();
  #routePointsList = new CreateListView();

  #routePoints = [];
  #pointPresenter = new Map();


  constructor(routeContainer, pointsModel, routeFilterContainer) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#routeFilterContainer = routeFilterContainer;
  }

  init = () => {
    this.#routePoints = [...this.#pointsModel.points];

    this.#renderRoute();
  };

  #renderFilters = () => {
    render(this.#filters, this.#routeFilterContainer);
  };

  #handlePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#routeSortComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#routePointsList.element, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#routePoints.forEach((point) => this.#renderPoint(point));
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    render(this.#routePointsList, this.#routeContainer);
    this.#renderPoints();
  };

  #renderRoute = () => {
    render(this.#routePointsList, this.#routeContainer);

    if (this.#routePoints.length === 0) {
      render(this.#loadingView, this.#routeContainer);
      return;
    }

    this.#renderFilters();
    this.#renderSort();
    this.#renderPointsList();
  };
}

