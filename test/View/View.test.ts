import View from '../../src/slider/View/View'

import sliderClassNames from '../../src/slider/utils/sliderClassNames'
import defaultState from '../../src/slider/utils/defaultState'
import { ModelState } from '../../src/slider/utils/interfaces/Model'

let modelState: ModelState

beforeEach(() => {
  document.body.innerHTML = '<div class="js-default-slider"></div>'
  modelState = {
    ...defaultState,
  }
})

describe('View', () => {
  it('Creates a slider in the DOM', () => {
    const view = new View(modelState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.toggle}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(1)
  })

  it('Creates the correct layout for the rangeSlider', () => {
    const rangeSliderState: ModelState = {
      ...modelState,
      currentValues: { min: 0, max: 100 },
    }

    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.toggle}`).length).toEqual(2)
  })

  it('Creates the correct layout for the slider with ruler', () => {
    const rangeSliderState = { ...modelState, ruler: true }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(1)
  })

  it('Creates a correct layout for a slider without ruler', () => {
    const rangeSliderState = { ...modelState, ruler: false }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(0)
  })

  it('Creates the correct layout for a slider with thumb', () => {
    const rangeSliderState = { ...modelState, thumb: true }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.thumb}`).length).toEqual(1)
  })

  it('Creates a correct layout for a slider without thumb', () => {
    const rangeSliderState = { ...modelState, thumb: false }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.thumb}`).length).toEqual(0)
  })
})
