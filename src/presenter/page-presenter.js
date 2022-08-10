import CreateFormView from '../view/create-form-view';
import EditFormView from '../view/edit-form-view';
import RoutePointView from '../view/route-point-view';
import SortView from '../view/sort-view';
import { render } from '../render';

export default class PagePresenter {
  pageForm = new CreateFormView();

  init = (pageContainer) => {
    this.pageContainer = pageContainer;

    render(new SortView(), this.pageContainer);
    render(this.pageForm, this.pageContainer);
    render(new EditFormView(), this.pageForm.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView, this.pageForm.getElement());
    }
  };
}
