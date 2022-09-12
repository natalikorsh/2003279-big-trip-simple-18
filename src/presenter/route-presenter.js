import CreateListView from '../view/create-list-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FilterView from '../view/filter-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortByDay, sortByPrice } from '../utils/utils.js';
import { SortType } from '../const.js';


export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;
  #routeFilterContainer = null;

  #filters = new FilterView();
  #routeSortComponent = new SortView();
  #loadingView = new LoadingView();
  #routePointsList = new CreateListView();

  #routePoints = [];
  #backupRoutePoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;


  constructor(routeContainer, pointsModel, routeFilterContainer) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#routeFilterContainer = routeFilterContainer;
  }

  init = () => {
    this.#routePoints = [...this.#pointsModel.points];
    this.#backupRoutePoints = [...this.#pointsModel.points];

    this.#renderRoute();
  };

  #renderFilters = () => {
    render(this.#filters, this.#routeFilterContainer);
  };

  #handlePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#backupRoutePoints = updateItem(this.#backupRoutePoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#routePoints.sort(sortByDay);
        break;
      case SortType.SORT_PRICE:
        this.#routePoints.sort(sortByPrice);
        break;
      case SortType.DEFAULT:
        this.#routePoints = [...this.#backupRoutePoints];
    }

    this.#currentSortType = sortType;
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#routeSortComponent, this.#routeContainer, RenderPosition.BEFOREEND);
    this.#routeSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

