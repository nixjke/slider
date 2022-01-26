import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import { ModelState } from '../utils/interfaces/Model'
import defaultState from '../utils/defaultState'

class Model extends Observer {
  private state: ModelState

  constructor(modelOptions: ModelState) {
    super()
    this.state = this.getConfirmedOptions(modelOptions)
  }

  getState = () => this.state

  updateOptions = (newOptions: ModelState) => {
    this.state = this.getConfirmedOptions(newOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.state)
  }

  private getConfirmedOptions = (checkingOptions: ModelState): ModelState => {
    const confirmedOptions = { ...checkingOptions }
    const { currentValues, range, step } = confirmedOptions
    const isCurrentValuesNan = Number.isNaN(currentValues.start) || Number.isNaN(currentValues.end)
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max)
    const isStepNan = Number.isNaN(step)
    const isRange = currentValues.hasOwnProperty('max')

    if (isRangeNan) {
      confirmedOptions.range.min = defaultState.range.min
      confirmedOptions.range.max = defaultState.range.max
    }

    if (isCurrentValuesNan) {
      confirmedOptions.currentValues.start = defaultState.currentValues.start
      if (isRange) {
        confirmedOptions.currentValues.end = range.max
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

    if (currentValues.start < range.min) {
      confirmedOptions.currentValues.start = range.min
    }

    const maxValueMoreThenRangeMax = isRange && currentValues.end! > range.max
    if (maxValueMoreThenRangeMax) {
      confirmedOptions.currentValues.end = range.max
    }

    if (currentValues.start > range.max) {
      confirmedOptions.currentValues.start = range.max
    }

    const maxValueLessThenRangeMax = isRange && currentValues.end! < range.min
    if (maxValueLessThenRangeMax) {
      confirmedOptions.currentValues.end = range.min
    }

    const maxValueLessThenMinValue = isRange && currentValues.end! < currentValues.start
    if (maxValueLessThenMinValue) {
      currentValues.start = range.min
      currentValues.end = range.max
    }

    return confirmedOptions
  }
}

export default Model
