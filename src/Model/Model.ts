import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import ModelState from '../utils/IModel'
import defaultState from '../utils/defaultState'

class Model extends Observer {
  private modelOptions: ModelState

  constructor(modelOptions: ModelState) {
    super()
    this.modelOptions = this.getConfirmedOptions(modelOptions)
  }

  getOptions = () => this.modelOptions

  updateOptions = (newOptions: ModelState) => {
    this.modelOptions = this.getConfirmedOptions(newOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.modelOptions)
  }

  private getConfirmedOptions = (checkingOptions: ModelState): ModelState => {
    const confirmedOptions = { ...checkingOptions }
    const { values, range, step } = confirmedOptions
    const isvaluesNan = Number.isNaN(values.start) || Number.isNaN(values.end)
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max)
    const isStepNan = Number.isNaN(step)
    const isRange = values.hasOwnProperty('end')

    if (isRangeNan) {
      confirmedOptions.range.min = defaultState.range.min
      confirmedOptions.range.max = defaultState.range.max
    }

    if (isvaluesNan) {
      confirmedOptions.values.start = defaultState.values.start
      if (isRange) {
        confirmedOptions.values.end = range.max
      }
    }

    const isStepInvalid = isStepNan || step <= 0
    if (isStepInvalid) {
      confirmedOptions.step = defaultState.step
    }

    const isStepMoreThenRangeend = !isStepInvalid && step > range.max
    if (isStepMoreThenRangeend) {
      confirmedOptions.step = range.max
    }

    if (range.min > range.max) {
      confirmedOptions.range.min = range.max
    }

    if (values.start < range.min) {
      confirmedOptions.values.start = range.min
    }

    const endValueMoreThenRangeend = isRange && values.end! > range.max
    if (endValueMoreThenRangeend) {
      confirmedOptions.values.end = range.max
    }

    if (values.start > range.max) {
      confirmedOptions.values.start = range.max
    }

    const endValueLessThenRangeend = isRange && values.end! < range.min
    if (endValueLessThenRangeend) {
      confirmedOptions.values.end = range.min
    }

    const endValueLessThenstartValue = isRange && values.end! < values.start
    if (endValueLessThenstartValue) {
      values.start = range.min
      values.end = range.max
    }

    return confirmedOptions
  }
}

export default Model
