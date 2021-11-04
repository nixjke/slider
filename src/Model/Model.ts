import { Observer, ObserverEvents } from '../Observer/Observer'
import { IState } from '../utils/interface'

class Model extends Observer {
  private state: IState

  constructor(state: IState) {
    super()
    this.state = state
  }
}

export default Model
