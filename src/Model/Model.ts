import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'
import defaultState from '../utils/defaultState'

class Model extends Observer {
  private state: IModelState

  constructor(state: IModelState) {
    super()
    this.state = this.getProcessedData(state)
  }

  public getState(): IModelState {
    return this.state
  }

  public updateState(state: IModelState): void {
    this.state = this.getProcessedData(state)
    this.notify(this.state)
  }

  private getProcessedData(state: IModelState): IModelState {
    const processedData = { ...state }
    const { values, range, step } = state
    const isValuesNan = Number.isNaN(values.start) || Number.isNaN(values.end)
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max)
    const isStepNan = Number.isNaN(step)
    const isRange = values.hasOwnProperty('max')

    if (isRangeNan) {
      processedData.range.min = defaultState.range.min
      processedData.range.max = defaultState.range.max
    }

    if (isValuesNan) {
      processedData.values.start = defaultState.values.start
      if (isRange) {
        processedData.values.end = range.max
      }
    }

    const isStepInvalid = isStepNan || step <= 0
    if (isStepInvalid) {
      processedData.step = defaultState.step
    }

    const isStepMoreThenRangeMax = !isStepInvalid && step > range.max
    if (isStepMoreThenRangeMax) {
      processedData.step = range.max
    }

    if (range.min > range.max) {
      processedData.range.min = range.max
    }

    if (values.start < range.min) {
      processedData.values.start = range.min
    }

    const maxValueMoreThenRangeMax = isRange && values.end! > range.max
    if (maxValueMoreThenRangeMax) {
      processedData.values.end = range.max
    }

    if (values.start > range.max) {
      processedData.values.start = range.max
    }

    const maxValueLessThenRangeMax = isRange && values.end! < range.min
    if (maxValueLessThenRangeMax) {
      processedData.values.end = range.min
    }

    const maxValueLessThenMinValue = isRange && values.end! < values.start
    if (maxValueLessThenMinValue) {
      values.start = range.min
      values.end = range.max
    }

    return processedData
  }
}

export default Model
