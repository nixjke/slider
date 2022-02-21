import Observer from '../Observer/Observer'
import Model from '../Model/Model'
import View from '../View/View'
import { ModelState } from '../utils/interfaces/Model'

class Presenter extends Observer {
  private modelState: ModelState
  private model: Model
  private view: View
  private domParent: HTMLElement

  constructor(domParent: HTMLElement, modelState: ModelState) {
    super()
    this.domParent = domParent
    this.modelState = modelState
    this.model = new Model(this.modelState)
    this.view = new View(this.modelState, this.domParent)
  }

  init() {
    this.subscribeModules()
    this.view.render()
  }

  updateOptions (modelState: ModelState)  {
    this.checkOnChangeRange(modelState)
    this.checkOnChangeOrientation(modelState)
    this.checkOnChangeThumbDisplay(modelState)
    this.model.updateOptions(this.getSplitModelOptions(modelState))
  }
}

export default Presenter
