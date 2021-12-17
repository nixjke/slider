import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'

class View extends Observer {
  private state: IModelState
  private anchor: HTMLElement

  constructor(state: IModelState, anchor: HTMLElement) {
    super()
    this.state = state
    this.anchor = anchor
    this.init()
  }

  init() {
    const template = '<div>Test Template View</div>'

    this.anchor.insertAdjacentHTML('afterbegin', template)
  }
}

export default View
