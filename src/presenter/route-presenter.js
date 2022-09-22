import CreateListView from '../view/create-list-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FilterView from '../view/filter-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { sortByDay, sortByPrice, filterPoints } from '../utils/utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';


export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;
  #routeFilterContainer = null;
  #routeSortComponent = null;
  #filterComponent = null;

  #loadingView = new LoadingView();
  #routePointsList = new CreateListView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #currentFilterType = FilterType.EVERYTHING;

  constructor(routeContainer, pointsModel, routeFilterContainer) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#routeFilterContainer = routeFilterContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    const filteredPoints = filterPoints(this.#currentFilterType, points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return points;
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

  // #handlePointChange = (updatedPoint) => {
  //   this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  // };

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

  #renderFilters = () => {
    this.#filterComponent = new FilterView(this.#currentFilterType);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    render(this.#filterComponent, this.#routeFilterContainer, RenderPosition.BEFOREEND);
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#currentFilterType = filterType;
    this.#clearRoute();
    this.#renderRoute();
  }

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

    remove(this.#filterComponent);
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

    this.#renderFilters();
    this.#renderSort();
    render(this.#routePointsList, this.#routeContainer);
    this.#renderPoints(points);
  };
}

