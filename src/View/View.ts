import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'

class View extends Observer {
  private state: IModelState
  private anchor: HTMLElement

  constructor(state: IModelState, anchor: HTMLElement) {
    super()
    this.state = state
    this.anchor = anchor
  }
}

export default View
