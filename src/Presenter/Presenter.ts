import Model from '../Model/Model'
import View from '../View/View'
import { State } from '../utils/interface'

class Presenter {
  model
  private view

  constructor(anchor: HTMLElement, state: State) {
    this.model = new Model(state)
    this.view = new View()
    console.log()
    this.model.on('modelState', this.model.setState)
  }
}

export default Presenter
