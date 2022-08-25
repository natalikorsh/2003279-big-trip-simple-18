import CreateListView from '../view/create-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import LoadingView from '../view/loading-view.js';
import { render, replace } from '../framework/render.js';

export default class PagePresenter {
  #pageContainer = null;
  #pointsModel = null;
  #pageList = new CreateListView();
  #routePoints = [];

  #renderedPointCount = 5;

  init = (pageContainer, pointsModel) => {
    this.#pageContainer = pageContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];

    if (this.#routePoints.length === 0) {
      render(new LoadingView(), this.#pageContainer);
    } else {
      render(new SortView(), this.#pageContainer);
      render(this.#pageList, this.#pageContainer);
      for (let i = 0; i < this.#routePoints.length; i++) {
        this.#renderRoute(this.#routePoints[i]);
      }
    }
  };

  #renderRoute = (point) => {
    const routeComponent = new RoutePointView(point);
    const editFormComponent = new EditFormView(point);

    const replacePointToEditForm = () => {
      replace(editFormComponent, routeComponent);
    };

    const replaceEditFormToPoint = () => {
      replace(routeComponent, editFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    routeComponent.setPointExpandHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setFormSubmitHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    editFormComponent.setFormResetHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render (routeComponent, this.#pageList.element);

  };

}

