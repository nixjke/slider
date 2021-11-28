import Model from '../Model/Model'
import View from '../View/View'
import VisualModel from '../Model/VisualModel'

class Presenter {
  private model = new Model();
  private visualModel = new VisualModel();
  private view: View = new View();

  constructor() {
    this._bindEvents();

    this.model.setState({
      min: 1,
      max: 100,
      values: [30, 60],
      step: 2,
    });
    this.visualModel.setState({
      direction: "vertical",
      bar: true,
      tip: true,
      type: "double",
    });
  }

  private _bindEvents() {
    this.visualModel.on("newVisualModel", (state: {}) => this.view.update(state));
    this.view.on("finishRenderTemplate", (wrapper: HTMLElement) => this.arrangeHandlers(wrapper));
    this.model.on("pxValueDone", (obj: {}) => this.view.update(obj));
  }

  // Начальная расстановка бегунков
  private arrangeHandlers(wrapper: HTMLElement) {
    const handlers = wrapper.querySelectorAll(".slider__handler");

    let edge;
    if (this.visualModel.state.direction === "vertical") {
      edge = wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight;
    } else {
      edge = wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;
    }

    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      });
    }

    this.listenUserEvents(wrapper);
  }

  private listenUserEvents(wrapper: HTMLElement) {
    wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const tempTarget = e.target as HTMLElement;
      const shiftX = e.offsetX;
      const shiftY = tempTarget.offsetHeight - e.offsetY;

      const mousemove = onMouseMove.bind(this);
      const mouseup = onMouseUp;

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function onMouseMove(this: Presenter, e: MouseEvent) {
        let left;
        if (this.visualModel.state.direction === "vertical") {
          left = wrapper.offsetHeight - e.clientY - shiftY + wrapper.getBoundingClientRect().top;
        } else {
          left = e.clientX - shiftX - wrapper.offsetLeft;
        }

        this.model.setState({ left, tempTarget });
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    });
  }
}
export default Presenter
