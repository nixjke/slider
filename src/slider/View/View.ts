import Observer from '../Observer/Observer'
import { ModelState } from '../utils/interfaces/Model'

class View extends Observer {
  private modelState: ModelState
  private domParent: HTMLElement

  constructor(modelState: ModelState, domParent: HTMLElement) {
    super()
    this.modelState = modelState
    this.domParent = domParent
  }
}

export default View
