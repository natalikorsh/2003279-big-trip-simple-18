import CreateListView from '../view/create-list-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByDay, sortByPrice, filterPoints } from '../utils/utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';


export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;
  #routeSortComponent = null;
  #filterModel = null;

  #loadingView = new LoadingView();
  #routePointsList = new CreateListView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(routeContainer, pointsModel, filterModel) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterPoints(filterType, points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints;
      case SortType.SORT_DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.SORT_PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  };

  init = () => {
    this.#renderRoute();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    };
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  };

  #renderSort = () => {
    this.#routeSortComponent = new SortView(this.#currentSortType);
    this.#routeSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#routeSortComponent, this.#routeContainer, RenderPosition.BEFOREEND);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearRoute();
    this.#renderRoute();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#routePointsList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #clearRoute = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#routeSortComponent);
    remove(this.#loadingView);
  }

  #renderLoadingView = () => {
    render(this.#loadingView, this.#routeContainer, RenderPosition.AFTERBEGIN);
  }

  #renderRoute = () => {
    const points = this.points;

    if (this.points.length === 0) {
      this.#renderLoadingView();
      return;
    }

    this.#renderSort();
    render(this.#routePointsList, this.#routeContainer);
    this.#renderPoints(points);
  };
}

