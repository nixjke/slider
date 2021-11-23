import Model from '../Model/Model'
import View from '../View/View'
import { State } from '../utils/interface'

class Presenter {
  private model
  private view

  constructor(anchor: HTMLElement, state: State) {
    this.model = new Model(state)
    this.view = new View()
    this.model.on(this.handleViewUpdate)
  }

  private handleViewUpdate(state: any) {
    this.model.setState(state)
  }
}

export default Presenter
