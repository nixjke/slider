import Model from '../Model/Model'
import View from '../View/View'
import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'

class Presenter extends Observer {
  private model: Model
  private view: View
  private anchor: HTMLElement

  constructor(anchor: HTMLElement, state: IModelState) {
    super()
    this.anchor = anchor
    this.model = new Model(state)
    this.view = new View(state, anchor)
  }
}
