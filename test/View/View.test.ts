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
    const rangeSliderState = { ...modelState, currentValues: { min: 0, max: 100 } }
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

  it('Notifies at mousemove at toggle', () => {
    const rangeSliderState = { ...modelState }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const toggle = document.querySelector(`.${sliderClassNames.handle}`) as HTMLElement
    toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    document.dispatchEvent(new MouseEvent('mousemove'))
    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(spy).toBeCalled()
  })

  it('Notifies at mousemove at toggle c range', () => {
    const rangeSliderState = { ...modelState, currentValues: { min: 0, max: 100 } }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const toggle = document.querySelector(`.${sliderClassNames.handle}`) as HTMLElement
    toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    document.dispatchEvent(new MouseEvent('mousemove'))
    document.dispatchEvent(new MouseEvent('mouseup'))
    expect(spy).toBeCalled()
  })

  it('Notifies you when you click on the ruler', () => {
    const rangeSliderState = {
      ...modelState,
      ruler: true,
    }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const rulerItem = document.querySelector(`.${sliderClassNames.rulerItem}`) as HTMLElement
    rulerItem.click()
    expect(spy).toBeCalled()
  })

  it('Notifies you when you click on the ruler range', () => {
    const rangeSliderState = {
      ...modelState,
      currentValues: { min: 0, max: 100 },
      withRuler: true,
    }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const rulerItem = document.querySelector(`.${sliderClassNames.rulerItem}`) as HTMLElement
    rulerItem.click()
    expect(spy).toBeCalled()
  })

  it('Notifies when you click on the ruler where the new currentValues.min is larger than the old one', () => {
    const rangeSliderState = {
      ...modelState,
      currentValues: { min: 0, max: 100 },
      withRuler: true,
    }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const rulerItem = document.querySelectorAll(`.${sliderClassNames.rulerItem}`)[1] as HTMLElement
    rulerItem.click()
    expect(spy).toBeCalled()
  })

  it('Notifies when you click on the ruler where the new currentValues.max is larger than the old one', () => {
    const rangeSliderState = {
      ...modelState,
      currentValues: { min: 0, max: 100 },
      withRuler: true,
    }
    const view = new View(rangeSliderState, document.querySelector('.js-default-slider') as HTMLElement)
    const spy = jest.spyOn(view, 'notify')
    view.render()
    const rulerItem = document.querySelectorAll(`.${sliderClassNames.rulerItem}`)[3] as HTMLElement
    rulerItem.click()
    expect(spy).toBeCalled()
  })

  it('Deletes domParent', () => {
    const rangeSliderState = { ...modelState, ruler: true }
    const parentElement = document.querySelector('.js-default-slider') as HTMLElement
    const view = new View(rangeSliderState, parentElement)
    view.render()
    view.destroyDom()
    expect(parentElement.children.length).toBe(0)
  })

  it('Updates the currentValues value', () => {
    const rangeSliderOptions = { ...modelState, withRuler: true }
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`) as HTMLElement
    const thumbValue = Number(thumb.textContent)
    const newMinValue = 1
    view.updateModelState({ ...modelState, currentValues: { min: newMinValue } })
    const newThumbValue = Number(thumb.textContent)
    expect(thumbValue).not.toBe(newThumbValue)
  })

  it('Handles the case when the updated currentVale > range.max', () => {
    const rangeSliderOptions = { ...modelState, currentValues: { min: 0, max: 100 } }
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider') as HTMLElement)
    view.render()
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`) as HTMLElement
    const thumbValue = Number(thumb.textContent)
    const newMinValue = 0
    view.updateModelState({ ...modelState, currentValues: { min: newMinValue } })
    const { max } = modelState.range
    expect(thumbValue).not.toBe(max)
  })
})
