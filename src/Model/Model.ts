import { Observer, ObserverEvents } from '../Observer/Observer'
import { IState } from '../utils/interface'

class Model extends Observer {
  private state: IState

  constructor(state: IState) {
    super()
    this.state = state
    console.log(this.correctMinMax(this.state))
  }

  public setState(state: IState) {}

  private correctMinMax(state: { min: number; max: number }) {
    const max = state.max === undefined ? this.state.max : state.max
    const min = state.min === undefined ? this.state.min : state.min

    if (min >= max) {
      return { min: max, max: min }
    }

    return { min, max }
  }
}

export default Model
