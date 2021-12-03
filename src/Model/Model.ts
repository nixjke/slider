import Observer from '../Observer/Observer'
import IModel from '../utils/IModel'

class Model extends Observer {
  private state: IModel

  constructor(state: IModel) {
    super()
    this.state = state
  }
}

export default Model
