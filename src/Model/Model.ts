import { Observer, ObserverEvents } from '../Observer/Observer'
import { IState, IOnlyNumbers } from '../utils/interface'

class Model extends Observer {
  private state: IState
  private mapOfHandles: Map<HTMLElement, IOnlyNumbers> = new Map()
  private edge = 0

  constructor(state: IState) {
    super()
    this.state = state
    console.log(this.correctValues(this.state))
  }

  public setState(state: IState) {}

  private updateArrayOfValues() {
    const values = []

    for (const handleObj of Array.from(this.mapOfHandles.values())) {
      values.push(handleObj.value)
    }

    values.sort((a, b) => a - b)

    if (this.mapOfHandles.size === 1) {
      if (this.state.max != null) {
        values[1] = this.state.max
      }
    }

    return { values }
  }

  private countPxValueFromValue(value: number) {
    const state = this.state
    return (value - state.min) * (this.getRatio() / state.step)
  }

  private getRatio() {
    const state = this.state
    const edge = this.edge

    const ratio = (edge / (state.max - state.min)) * state.step

    if (!isFinite(ratio)) {
      return 0
    }
    return ratio
  }

  private correctMinMax(state: IState): object {
    const max = state.max === undefined ? this.state.max : state.max
    const min = state.min === undefined ? this.state.min : state.min

    if (min >= max) {
      return { min: max, max: min }
    }

    return { min, max }
  }

  private correctStep(state: IState): number {
    const step = state.step === undefined ? this.state.step : state.step
    const { min, max } = state

    const diff = Math.abs(max - min)

    if (step > diff) {
      return diff
    }

    if (step < 1) {
      return 1
    }

    return step
  }

  private correctValues(state: IState): number[] {
    const values = state.value === undefined ? this.state.value : state.value
    const newValues = values.map(value => this.correctValueInRange(value, state)).sort((a, b) => a - b)

    const { max } = state
    if (newValues.length === 1) {
      newValues.push(max)
    }

    return newValues
  }

  private correctValueInRange(value: number, state: IState = this.state): number {
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

  private createSteps() {
    const { min, max, step } = this.state
    const pieces = (max - min) / step
    const result = new Set([min, max])

    if (pieces >= 15) {
      const percent = (max - min) * 0.2
      for (let i = min; i <= max; i += percent) {
        result.add(this.correctValueInRange(i))
      }
    } else {
      for (let i = min + step; i <= max; i += step) {
        result.add(i)
      }
    }

    return Array.from(result).sort((a, b) => a - b)
  }
}

export default Model
