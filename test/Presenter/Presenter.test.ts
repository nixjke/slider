import Presenter from '../../src/slider/Presenter/Presenter'
import { ModelState } from '../../src/slider/utils/interfaces/Model'
import defaultState from '../../src/slider/utils/defaultState'

let sliderState: ModelState
const divSlider = document.createElement('div')

beforeEach(() => {
  sliderState = {
    ...defaultState,
  }
})

describe('Presenter', () => {
  it('Initialized', () => {
    const presenter = new Presenter(divSlider, sliderState)
    presenter.init()
    expect.call(presenter.init, '')
  })

  it('Ipdates slider settings', () => {
    const presenter = new Presenter(divSlider, sliderState)
    const newSliderState = { ...sliderState, currentValues: { min: 1 }, range: { min: 0, max: 100 } }
    presenter.updateState(newSliderState)
    expect.call(presenter.updateState, newSliderState)
  })
})
