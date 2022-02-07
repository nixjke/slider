import Observer from '../Observer/Observer'
import { ModelState } from '../utils/interfaces/Model'

import Bar from './components/bar/Bar'

class View extends Observer {
  private modelState: ModelState
  private domParent: HTMLElement
  private bar!: Bar

  constructor(modelState: ModelState, domParent: HTMLElement) {
    super()
    this.modelState = modelState
    this.domParent = domParent
  }
}

export default View
