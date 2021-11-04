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

  private correctStep(state: { min: number; max: number; step: number }): number {
    const step = state.step === undefined ? this.state.step : state.step
    const { min, max } = state

    const diff = Math.abs(max - min) || 1

    if (step > diff) {
      return diff
    }

    if (step < 1) {
      return 1
    }

    return step
  }
}

export default Model
