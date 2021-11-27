import Model from '../Model/Model'
import View from '../View/View'
import { State } from '../utils/interface'

class Presenter {
  private model
  private view

  constructor(public anchor: HTMLElement, public state: State) {
    this.model = new Model(state)
    this.view = new View(anchor)
  }
}
export default Presenter
