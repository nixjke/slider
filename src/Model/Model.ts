import { IState } from '../utils/interface'

class Model {
  public state: IState = {}

  constructor(state: IState) {
    this.setState(state)
  }

  public setState(state: IState): void {
    Object.assign(this.state, state)
    console.log(this.state)
  }
}

export default Model
