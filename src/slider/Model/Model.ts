import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import { ModelState } from '../utils/interfaces/Model'
import defaultState from '../utils/defaultState'

class Model extends Observer {
  private modelState: ModelState

  constructor(modelState: ModelState) {
    super()
    this.modelState = this.getConfirmedOptions(modelState)
  }

  getState() {
    return this.modelState
  }

  updateState(newState: ModelState): void {
    this.modelState = this.getConfirmedOptions(newState)
    this.notify(ObserverEvents.modelStateUpdate, this.modelState)
  }

  private getConfirmedOptions(checkingOptions: ModelState): ModelState {
    const confirmedOptions = { ...checkingOptions }
    const { currentValues, range, step } = confirmedOptions
    const isCurrentValuesNan = Number.isNaN(currentValues.min) || Number.isNaN(currentValues.max)
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max)
    const isStepNan = Number.isNaN(step)
    const isRange = currentValues.hasOwnProperty('max')

    if (isRangeNan) {
      confirmedOptions.range.min = defaultState.range.min
      confirmedOptions.range.max = defaultState.range.max
    }

    if (isCurrentValuesNan) {
      confirmedOptions.currentValues.min = defaultState.currentValues.min
      if (isRange) {
        confirmedOptions.currentValues.max = range.max
      }
    }

    const isStepInvalid = isStepNan || step <= 0
    if (isStepInvalid) {
      confirmedOptions.step = defaultState.step
    }

    const isStepMoreThenRangeMax = !isStepInvalid && step > range.max
    if (isStepMoreThenRangeMax) {
      confirmedOptions.step = range.max
    }

    if (range.min > range.max) {
      confirmedOptions.range.min = range.max
    }

    if (currentValues.min < range.min) {
      confirmedOptions.currentValues.min = range.min
    }

    const maxValueMoreThenRangeMax = isRange && currentValues.max! > range.max
    if (maxValueMoreThenRangeMax) {
      confirmedOptions.currentValues.max = range.max
    }

    if (currentValues.min > range.max) {
      confirmedOptions.currentValues.min = range.max
    }

    const maxValueLessThenRangeMax = isRange && currentValues.max! < range.min
    if (maxValueLessThenRangeMax) {
      confirmedOptions.currentValues.max = range.min
    }

    const maxValueLessThenMinValue = isRange && currentValues.max! < currentValues.min
    if (maxValueLessThenMinValue) {
      currentValues.min = range.min
      currentValues.max = range.max
    }

    return confirmedOptions
  }
}

export default Model
