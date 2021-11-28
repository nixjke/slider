import Model from '../Model/Model'
import View from '../View/View'
import VisualModel from '../Model/VisualModel'

class Presenter {
  private model = new Model()
  private visualModel = new VisualModel()
  private test = document.querySelector('#anchor') as HTMLElement
  private view: View = new View(this.test)

  constructor(private anchor: HTMLElement) {
    this._bindEvents()

    this.model.setState({
      min: 1,
      max: 100,
      values: [30, 60],
      step: 2,
    })
    this.visualModel.setState({
      direction: 'vertical',
      bar: true,
      tip: true,
      type: 'single',
    })
  }

  private _bindEvents() {
    this.visualModel.on('newVisualModel', (state: {}) => this.view.update(state))
    this.view.on('finishRenderTemplate', (wrapper: HTMLElement) => this.arrangeHandlers(wrapper))
    this.model.on('pxValueDone', (obj: {}) => this.view.update(obj))
    this.view.on('onUserMove', (obj: {}) => this.model.setState(obj))
  }

  // Начальная расстановка бегунков
  private arrangeHandlers({ edge, handlers }: any) {
    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      })
    }
  }
}
export default Presenter
