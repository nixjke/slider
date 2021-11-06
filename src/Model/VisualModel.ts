import { Observer } from '../Observer/Observer'
import { VisualState } from '../utils/interface'
import { defaultVisualModel } from '../utils/constants'

class VisualModel extends Observer {
  public state: VisualState = defaultVisualModel

  constructor(state: VisualState) {
    super()
    this.setState(state)
  }

  public setState(state: VisualState) {
    this.state = { ...this.state, ...state }
    this.notify('newVisualModel', this.state)
  }
}

export default VisualModel
