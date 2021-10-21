import ModelState from '../interface/interface'

class Model {
  public state: ModelState = {}

  constructor(state = {}) {
    this.setState(state)
  }

  public setState(state = {}): void {
    Object.assign(this.state, state)
  }
}

export default Model