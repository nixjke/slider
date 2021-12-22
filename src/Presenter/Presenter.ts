import Model from '../Model/Model'
import View from '../View/View'
import Observer from '../Observer/Observer'
import ModelState from '../utils/IModel'

class Presenter extends Observer {
  private model: Model
  private view: View
  private anchor: HTMLElement

  constructor(anchor: HTMLElement, state: ModelState) {
    super()
    this.anchor = anchor
    this.model = new Model(this.getSplitModelState(state))
    this.view = new View(state, anchor)
  }

  getModelState() {
    return this.model.getState()
  }

  private getSplitModelState(state: any): ModelState {
    const { values, range, scale, tip, step, orientation } = state

    return {
      values,
      range,
      scale,
      tip,
      step,
      orientation,
    }
  }
}

export default Presenter
