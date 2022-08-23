import CreateListView from '../view/create-list-view.js';
import CreateFormView from '../view/create-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';
import EditFormView from '../view/edit-form-view.js';

export default class PagePresenter {
  #pageContainer = null;
  #pointsModel = null;
  #pageList = new CreateListView();
  #createFormComponent = new CreateFormView();
  #routePoints = [];

  init = (pageContainer, pointsModel) => {
    this.#pageContainer = pageContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];

    render(new SortView(), this.#pageContainer);
    render(this.#pageList, this.#pageContainer);

    for (let i = 0; i < this.#routePoints.length; i++) {
      this.#renderRoute(this.#routePoints[i]);
    }
  };

  #renderRoute = (point) => {
    const routeComponent = new RoutePointView(point);
    const editFormComponent = new EditFormView(point);

    const replacePointToEditForm = () => {
      this.#pageList.element.replaceChild(editFormComponent.element, routeComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#pageList.element.replaceChild(routeComponent.element, editFormComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    routeComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__reset-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render (routeComponent, this.#pageList.element);

  };

}

