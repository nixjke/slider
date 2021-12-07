import Observer from '../Observer/Observer'
import IModel from '../utils/IModel'

class View extends Observer {
  private state: IModel
  private anchor: HTMLElement

  constructor(state: IModel, anchor: HTMLElement) {
    super()
    this.state = state
    this.anchor = anchor
  }
}

export default View
