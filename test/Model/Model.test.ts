import Model from '../../src/slider/Model/Model'
import { ModelState } from '../../src/slider/utils/interfaces/Model'
import defaultState from '../../src/slider/utils/defaultState'
import { mode } from '../../webpack.config'

let modelState: ModelState
let model: Model

beforeEach(() => {
  modelState = {
    ...defaultState,
  }

  model = new Model(modelState)
})

describe('Model', () => {
  it('returns the current slider settings', () => {
    expect(model.getState()).toEqual(modelState)
  })

  it('updates slider settings', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 50 },
      range: { min: 20, max: 100 },
    }

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(newSliderState)
  })

  it('range It cannot be NaN', () => {
    const newSliderState: ModelState = { ...modelState, range: { min: NaN, max: 100 } }
    model.updateState(newSliderState)
    expect(model.getState()).toEqual(newSliderState)

    const stateWithRangeMaxNaN: ModelState = { ...modelState, range: { min: 1, max: NaN } }
    model.updateState(stateWithRangeMaxNaN)
    expect(model.getState()).toEqual(stateWithRangeMaxNaN)
  })

  it('cuurentValues.max cannot be > range.max', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 0, max: 100 },
      range: { min: 0, max: 200 },
    }
    model.updateState(newSliderState)
    expect(model.getState()).toEqual(newSliderState)
  })

  it('cuurentValues.max cannot be < range.min', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 0, max: -1 },
      range: { min: 0, max: 100 },
    }
    model.updateState(newSliderState)
    expect(model.getState()).toEqual(newSliderState)
  })

  it('currentValues cannot be NaN', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: NaN, max: 100 },
    }
    model.updateState(newSliderState)
    expect(model.getState()).toEqual(newSliderState)

    const stateWithCurrentValueMaxNaN: ModelState = {
      ...modelState,
      currentValues: { min: 1, max: NaN },
    }
    model.updateState(stateWithCurrentValueMaxNaN)
    expect(model.getState()).toEqual(stateWithCurrentValueMaxNaN)
  })

  it('step cannot be less than 0', () => {
    const newSliderState = { ...modelState, step: -1 }
    const correctSliderState = { ...modelState }

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(correctSliderState)
  })

  it('step cannot be equals than 0', () => {
    const newSliderState = { ...modelState, step: 0 }
    const correctSliderState = { ...modelState }

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(correctSliderState)
  })

  it('does not pass currentValue below range', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 1 },
      range: { min: 2, max: 100 },
    };

    const correctSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 2 },
      range: { min: 2, max: 100 },
    };

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(correctSliderState)
  })

  it('does not pass currentValue above range', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 11 },
      range: { min: 2, max: 10 },
    }

    const correctSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 10 },
      range: { min: 2, max: 10 },
    }

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(correctSliderState)
  })

  it('currentValue[0] cannot be greater than currentValues[1] and vice versa', () => {
    const newSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 5, max: 3 },
      range: { min: 2, max: 10 },
    }

    const correctSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 2, max: 10 },
      range: { min: 2, max: 10 },
    }

    model.updateState(newSliderState)
    expect(model.getState()).toEqual(correctSliderState)
  })
})
