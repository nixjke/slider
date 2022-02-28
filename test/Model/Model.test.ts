import Model from "../../src/slider/Model/Model"
import { ModelState } from "../../src/slider/utils/interfaces/Model"
import defaultState from "../../src/slider/utils/defaultState"

let modelState: ModelState
let model: Model

beforeEach(() => {
  modelState = {
    ...defaultState
  }

  model = new Model(modelState)
})

describe('Model', () => {
  it('returns the current slider settings', () => {
    expect(model.getState()).toEqual(modelState)
  })
})
