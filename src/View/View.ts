import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'
import './components/bar/bar.scss'

const barTemplate = require('./components/bar/bar.hbs')

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
    this.anchor.insertAdjacentHTML('afterbegin', barTemplate())
  }
}

export default View
