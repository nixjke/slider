import Observer from '../Observer/Observer'
import { IState, IOnlyNumbers } from '../utils/interface'

class Model extends Observer {
  public state: IState = {}
  private mapOfHandlers: Map<HTMLElement, IOnlyNumbers> = new Map()

  constructor(state = {}) {
    super()

    this.setState(state)
  }

  public setState(state: any = {}): void {
    Object.assign(this.state, state)

    // для корректировки основных значений
    if (state.min || state.max || state.step) {
      this.correctMinMaxRange()
      this.correctStep()
      this.state.values = (this.state.values as number[]).map(value => this.correctValue(value)).sort((a, b) => a - b)
    }

    // для начальной отрисовки
    if (state.tempTarget && state.edge && state.tempValue) {
      this.initialCounting(state)
    }

    // для отрисовки от действий пользователя
    if (state.tempTarget && state.left) {
      this.dynamicCounting(state)
    }
  }

  private initialCounting(state: any) {
    this.state.tempPxValue = this.countPxValueFromValue(state.tempValue as number)
    this.createArrayOfPxValues(this.state.values as number[])

    this.mapOfHandlers.set(state.tempTarget, {
      tempValue: state.tempValue,
      tempPxValue: this.state.tempPxValue,
    })
  }

  private dynamicCounting(state: any) {
    this.state.tempValue = this.countValueFromLeft(state.left)
    this.state.tempPxValue = this.countPxValueFromValue(this.state.tempValue as number)

    this.mapOfHandlers.set(state.tempTarget, {
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
    })
    this.updateArrayOfValues()
    this.createArrayOfPxValues(this.state.values as number[])
  }

  private updateArrayOfValues(): void {
    this.state.values = []
    for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
      this.state.values.push(handlerObj.tempValue)
    }
    this.state.values.sort((a, b) => a - b)
  }

  private createArrayOfPxValues(array: number[]): void {
    const tempPxValues = array.map(value => this.countPxValueFromValue(value)).sort((a, b) => a - b)

    this.notify('pxValueDone', {
      tempTarget: this.state.tempTarget,
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
      tempPxValues,
    })
  }

  private countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers
    const value = (left / ((state.edge / (state.max - state.min)) * state.step)) * state.step + state.min
    return this.correctValue(value)
  }

  private countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers
    const tempPxValue = (value - state.min) * (state.edge / (state.max - state.min))
    return tempPxValue
  }

  private correctValue(value: number): number {
    value = this.correctValueInTheRange(value)
    value = this.correctValueByStep(value)

    return value
  }

  private correctMinMaxRange(): void {
    if (this.state.min > this.state.max) {
      const temp = this.state.min
      this.state.min = this.state.max
      this.state.max = temp
    }
  }

  private correctStep(): void {
    this.state.step < 1 ? (this.state.step = 1) : ''
    this.state.step > this.state.max ? (this.state.step = this.state.max) : ''
  }

  private correctValueInTheRange(value: number): number {
    return this.isValueInTheRange(value)
  }

  private isValueInTheRange(value: number): number {
    if (value < this.state.min) {
      return this.state.min as number
    } else if (value > this.state.max) {
      return this.state.max as number
    } else {
      return value
    }
  }

  private correctValueByStep(value: number): number {
    const step = this.state.step as number
    const newValue = Math.ceil(value / step) * step

    if (newValue > this.state.max) {
      return Math.floor(value / step) * step
    } else {
      return newValue
    }
  }
}

export default Model
