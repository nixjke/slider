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

  it('Creates a vertical slider', () => {
    const rangeSliderOptions: ModelState = {
      ...modelState,
      orientation: 'vertical',
      ruler: true,
    }
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    const isBarHaveVerticalClass = (
      document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    ).classList.contains(`${sliderClassNames.barVertical}`)
    const isToggleHaveVerticalClass = (
      document.querySelector(`.${sliderClassNames.toggle}`) as HTMLElement
    ).classList.contains(`${sliderClassNames.toggleVertical}`)
    const isRulerHaveVerticalClass = (
      document.querySelector(`.${sliderClassNames.ruler}`) as HTMLElement
    ).classList.contains(`${sliderClassNames.rulerVertical}`)
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1)
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1)
    expect(isBarHaveVerticalClass).toBeTruthy()
    expect(isToggleHaveVerticalClass).toBeTruthy()
    expect(isRulerHaveVerticalClass).toBeTruthy()
  })

  it('Notifies you when you click on the bar', () => {
    const rangeSliderState = { ...modelState }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    bar.click()
    expect(spy).toBeCalled()
  })

  it('Handles bar clicks with currentValues.min and currentValues.max', () => {
    const rangeSliderState = { ...modelState, currentValues: { min: 0, max: 100 } }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    bar.click()
    expect(spy).toBeCalled()
  })

  it('Handles bar click if currentValue.min === currentValue.max', () => {
    const rangeSliderState = { ...modelState, currentValues: { min: 15, max: 15 } }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    bar.click()
    expect(spy).toBeCalled()
  })

  it('Handles the click on thumb', () => {
    const rangeSliderState = { ...modelState }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    const toggle = document.querySelector(`.${sliderClassNames.toggle}`) as HTMLElement
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`) as HTMLElement
    thumb.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(toggle.classList.contains(`${sliderClassNames.toggleActive}`)).toBeTruthy()
  })
})
