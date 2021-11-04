import Model from '../Model/Model'
import View from '../View/View'
import { Observer, ObserverEvents } from '../Observer/Observer'

import { IState } from '../utils/interface'

class Presenter extends Observer {
  private anchor: HTMLElement
  private state: IState

  constructor(anchor: HTMLElement, state: IState) {
    super()
    this.anchor = anchor
    this.state = state
    this.init()
  }

  init() {
    const model = new Model(this.state)
  }
}

export default Presenter