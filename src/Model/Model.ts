import Observer from '../Observer/Observer'
import { State } from '../utils/interface'

class Model extends Observer {
  constructor(private state: State) {
    super()
    this.setState(state)
  }

  public setState(state: State) {
    const { min, max } = this.correctMinMax({ min: state.min, max: state.max })
    const step = this.correctStep({ step: state.step, min, max })
    const values = this.correctValues({ values: state.values, min, max, step })
    this.state = { ...this.state, min, max, step, values }
    this.notify(this.state)
  }

  private correctMinMax(state: { min: number; max: number }) {
    const max = state.max === undefined ? this.state.max : state.max
    const min = state.min === undefined ? this.state.min : state.min

    if (min >= max) {
      return { min: max, max: min }
    }

    return { min, max }
  }

  private correctStep(state: { step: number; min: number; max: number }) {
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

  private correctValues(state: { min: number; max: number; values: number[]; step: number }) {
    const values = state.values === undefined ? this.state.values : state.values
    const newValues = values.map(value => this.correctValueInTheRange(value, state)).sort((a, b) => a - b)

    const { max } = state
    if (newValues.length === 1) {
      newValues.push(max)
    }

    return newValues
  }

  private correctValueInTheRange(
    value: number,
    state: { min: number; max: number; values: number[]; step: number } = this.state
  ) {
    const { step, min, max } = state
    const offset = min - Math.round(min / step) * step
    const newValue = Math.round(value / step) * step + offset

    if (newValue < min) {
      return min
    }

    if (newValue > max) {
      return max
    }

    if (value === max) {
      return max
    }

    return newValue
  }
}

export default Model
