import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import { BarProps, DomNode } from '../utils/interfaces/Components/IBar'
import { RulerProps } from '../utils/interfaces/Components/IRuler'
import { ThumbProps } from '../utils/interfaces/Components/IThumb'
import { IToggle, ToggleProps } from '../utils/interfaces/Components/IToggle'
import { ModelState } from '../utils/interfaces/Model'
import sliderClassNames from '../utils/sliderClassNames'

import Bar from './components/bar/Bar'
import Ruler from './components/ruler/Ruler'
import Thumb from './components/thumb/Thumb'
import Toggle from './components/toggle/Toggle'

class View extends Observer {
  private modelState: ModelState
  private domParent: HTMLElement
  private slider!: HTMLElement

  private isVertical: boolean
  private isRange: boolean

  private bar!: Bar
  private ruler!: Ruler | null
  private toggles!: IToggle[]
  private activeToggle!: Toggle
  private activeToggleIndex!: number

  constructor(modelState: ModelState, domParent: HTMLElement) {
    super()
    this.modelState = modelState
    this.domParent = domParent
    const { currentValues, orientation } = this.modelState
    this.isVertical = orientation === 'vertical'
    this.isRange = currentValues.hasOwnProperty('max')
    this.initViewComoponents()
  }

  render() {
    this.mountSlider()
  }

  destroyDom() {
    this.domParent.removeChild(this.slider)
  }

  updateModelState(modelState: ModelState) {
    this.modelState = modelState
  }

  getRulerValues() {
    return this.ruler!.getRulerValues()
  }

  private initViewComoponents() {
    const { ruler } = this.modelState
    this.ruler = ruler ? this.getRuler() : null
    this.bar = this.getBar()
    this.toggles = this.getToggles()
  }

  private getRuler(): Ruler {
    const ruler = new Ruler(this.getRulerProps())
    ruler.on(ObserverEvents.rulerHide, this.handleRulerHide)
    return ruler
  }

  private getRulerProps = (): RulerProps => {
    const { range, step, ruler } = this.modelState

    return {
      range,
      step,
      ruler,
      isVertical: this.isVertical,
    }
  }

  private handleRulerHide() {
    if (this.ruler) {
      this.ruler.destroyDom()
      this.ruler = null
    }
  }

  private getBar() {
    return new Bar(this.getBarProps())
  }

  private getBarProps(): BarProps {
    const { currentValues, range } = this.modelState
    return { currentValues, range, isVertical: this.isVertical }
  }

  private getToggles(): IToggle[] {
    const { currentValues, thumb } = this.modelState

    return Object.entries(currentValues).map(([, value]) => {
      const scalePosition = this.bar.getPosition(value!)
      const toggleProps: ToggleProps = { scalePosition, isVertical: this.isVertical }
      const toggle = {
        main: new Toggle(toggleProps),
        thumb: thumb ? new Thumb(this.getThumbProps(value!)) : null,
      }

      return toggle
    })
  }

  private getThumbProps = (value: number): ThumbProps => {
    const { thumb } = this.modelState
    return { thumb, value }
  }

  private mountSlider() {
    this.domParent.appendChild(this.createSliderContainer())
  }

  private createSliderContainer(): HTMLDivElement {
    const sliderDom = document.createElement('div')
    sliderDom.classList.add(sliderClassNames.slider)
    const sliderContainer = document.createElement('div')
    sliderContainer.classList.add(sliderClassNames.wrap)
    sliderContainer.appendChild(this.bar.getHtml())

    if (this.ruler) {
      sliderContainer.appendChild(this.ruler.getHtml())
    }

    this.toggles.forEach((toggle: IToggle) => {
      const toggleHtml = toggle.main.getHtml()
      if (toggle.thumb) toggleHtml.appendChild(toggle.thumb.getHtml())
      sliderContainer.appendChild(toggleHtml)
    })

    sliderDom.appendChild(sliderContainer)
    return sliderDom
  }

  private saveDom() {
    this.slider = this.domParent.querySelector(`.${sliderClassNames.slider}`) as HTMLElement
    this.saveBarDom()
  }

  private saveBarDom() {
    return this.bar.setDomNode(this.getBarDom())
  }

  private getBarDom(): DomNode {
    const bar = this.domParent.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    const scale = this.domParent.querySelector(`.${sliderClassNames.scale}`) as HTMLElement
    return { scale, bar }
  }
}

export default View