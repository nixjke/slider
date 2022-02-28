import Model from '../../src/slider/Model/Model'
import { ModelState } from '../../src/slider/utils/interfaces/Model'
import defaultState from '../../src/slider/utils/defaultState'

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
  
})
