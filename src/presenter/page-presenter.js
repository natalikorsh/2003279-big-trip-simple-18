import CreateListView from '../view/create-list-view.js';
import CreateFormView from '../view/create-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class PagePresenter {
  pageList = new CreateListView();

  init = (pageContainer, pointsModel) => {
    this.pageContainer = pageContainer;
    this.pointsModel = pointsModel;
    this.routePoints = [...this.pointsModel.get()];

    render(new SortView(), this.pageContainer);
    render(this.pageList, this.pageContainer);
    render(new CreateFormView(...this.routePoints), this.pageList.getElement());

    for (let i = 0; i < this.routePoints.length; i++) {
      render(new RoutePointView(this.routePoints[i]), this.pageList.getElement());
    }
  };
}
