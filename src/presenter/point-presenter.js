import { render, replace, remove } from '../framework/render.js';
import RoutePointView from '../view/route-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual, isPriceEqual } from '../utils/utils.js';

const mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #routePointsContainer = null;
  #pointComponent = null;
  #pointEditForm = null;
  #changeMode = null;
  #changeData = null;

  #point = null;
  #mode = mode.DEFAULT;

  constructor(routePointsContainer, changeData, changeMode) {
    this.#routePointsContainer = routePointsContainer;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditForm = this.#pointEditForm;

    this.#pointComponent = new RoutePointView(point);
    this.#pointEditForm = new EditFormView(point);

    this.#pointComponent.setPointExpandHandler(this.#expandHandler);
    this.#pointEditForm.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditForm.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditForm.setRollupHandler(this.#rollupHandler);

    if (prevPointComponent === null || prevPointEditForm === null) {
      render(this.#pointComponent, this.#routePointsContainer);
      return;
    }

    if (this.#mode === mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === mode.EDITING) {
      replace(this.#pointEditForm, prevPointEditForm);
    }

    remove(prevPointComponent);
    remove(prevPointEditForm);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditForm);
  };

  resetView = () => {
    if (this.#mode !== mode.DEFAULT) {
      this.#pointEditForm.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm = () => {
    replace(this.#pointEditForm, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = mode.DEFAULT;
  };

  #expandHandler = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isPriceEqual(this.#point.basePrice, update.basePrice);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #rollupHandler = () => {
    this.#pointEditForm.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditForm.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };
}
