import Bar from './components/bar/Bar'
import Ruler from './components/ruler/Ruler'
import Thumb from './components/thumb/Thumb'
import Toggle from './components/toggle/Toggle'

import sliderClassNames from '../utils/sliderClassNames'

import ObserverEvents from '../Observer/ObserverEvents'
import Observer from '../Observer/Observer'
import ModelState from '../utils/IModel'
import IRulerProps from '../utils/interfaces/view/components/ruler/IRulerProps'
import IBarProps from '../utils/interfaces/view/components/bar/IBarProps'
import IToggle from '../utils/interfaces/view/components/toggle/IToggle'
import IToggleProps from '../utils/interfaces/view/components/toggle/IToggleProps'
import IThumbProps from '../utils/interfaces/view/components/thumb/IThumbProps'
import IDomNode from '../utils/interfaces/view/components/bar/IDomNode'

interface ClickCoordinate {
  x: number
  y: number
}

class View extends Observer {
  private state: ModelState
  private domParent: HTMLElement
  private slider!: HTMLElement
  private isVertical: boolean
  private isRange: boolean
  private bar!: Bar
  private ruler!: Ruler | null
  private toggles!: IToggle[]
  private activeToggle!: Toggle
  private activeToggleIndex!: number

  constructor(state: ModelState, domParent: HTMLElement) {
    super()
    this.state = state
    this.domParent = domParent
    const { values, orientation } = this.state
    this.isVertical = orientation === 'vertical'
    this.isRange = values.hasOwnProperty('max')
    this.initViewComponents()
  }

  render() {
    this.mountSlider()
    this.saveDom()
    if (this.isVertical) {
      this.setVerticalClasses()
    }
    this.setListeners()
  }

  destroyDom = () => {
    this.domParent.removeChild(this.slider)
  }

  private initViewComponents() {
    const { ruler } = this.state
    this.ruler = ruler ? this.getRuler() : null
    this.bar = this.getBar()
    this.toggles = this.getToggles()
  }

  private getRuler(): Ruler {
    const ruler = new Ruler(this.getRulerProps())
    ruler.subscribe(ObserverEvents.rulerHide, this.handleRulerHide)
    return ruler
  }

  private getRulerProps(): IRulerProps {
    const { range, step, ruler } = this.state

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

  private getBarProps(): IBarProps {
    const { values, range } = this.state
    return { values, range, isVertical: this.isVertical }
  }

  private getToggles(): IToggle[] {
    const { values, thumb } = this.state

    return Object.entries(values).map(([, value]) => {
      const scalePosition = this.bar.getPosition(value!)
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical }
      const toggle = {
        main: new Toggle(toggleProps),
        thumb: thumb ? new Thumb(this.getThumbProps(value!)) : null,
      }

      return toggle
    })
  }

  private getThumbProps(value: number): IThumbProps {
    const { thumb } = this.state
    return { thumb, value }
  }

  private getCleanCoordinate(clickCoordinate: ClickCoordinate): number {
    const { toggle: activeToggle } = this.activeToggle.getDomNode()
    const halfHandleWidth = activeToggle.offsetWidth / 4
    const leftToggleMargin = this.isVertical ? 5 : 7
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin
    const cleanCoordinate = this.isVertical ? clickCoordinate.y - interfering : clickCoordinate.x - interfering
    return cleanCoordinate
  }

  private mountSlider() {
    this.domParent.appendChild(this.createSliderContainer())
  }

  private createSliderContainer = (): HTMLDivElement => {
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

  private saveDom = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassNames.slider}`) as HTMLElement
    this.saveBarDom()
    this.saveTogglesDom()

    if (this.ruler) {
      this.saveRuler()
    }

    const { thumb } = this.state
    if (thumb) {
      this.saveThumbDom()
    }
  }

  private saveBarDom = () => this.bar.setDomNode(this.getBarDom())

  private getBarDom = (): IDomNode => {
    const bar = this.domParent.querySelector(`.${sliderClassNames.bar}`) as HTMLElement
    const scale = this.domParent.querySelector(`.${sliderClassNames.scale}`) as HTMLElement
    return { scale, bar }
  }

  private saveTogglesDom = () => {
    const domToggles = this.domParent.querySelectorAll(`.${sliderClassNames.toggle}`)
    domToggles.forEach((domToggle, index) => {
      const domNode = {
        toggle: domToggle as HTMLElement,
        handle: domToggle.querySelector(`.${sliderClassNames.handle}`) as HTMLElement,
      }

      this.toggles[index].main.setDomNode(domNode)
    })
  }

  private saveRuler = () => {
    const domRuler = this.domParent.querySelector(`.${sliderClassNames.ruler}`) as HTMLElement
    this.ruler!.setDomNode({ ruler: domRuler })
  }

  private saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassNames.thumb}`)
    domThumbs.forEach((domThumb, index) => {
      this.toggles[index].thumb!.setDomNode({ thumb: domThumb as HTMLElement })
    })
  }

  private setVerticalClasses = () => {
    const { bar } = this.bar.getDomNode()
    bar.classList.add(`${sliderClassNames.barVertical}`)

    const { ruler, thumb } = this.state
    this.toggles.forEach((toggle: IToggle) => {
      const { toggle: toggleHtml } = toggle.main.getDomNode()
      toggleHtml.classList.add(`${sliderClassNames.toggleVertical}`)

      if (thumb) {
        const { thumb } = toggle.thumb!.getDomNode()
        thumb.classList.add(`${sliderClassNames.thumbVertical}`)
      }
    })

    if (ruler) {
      const { ruler } = this.ruler!.getDomNode()
      const rulerItems = ruler.querySelectorAll(`.${sliderClassNames.rulerItem}`)
      ruler.classList.add(`${sliderClassNames.rulerVertical}`)
      rulerItems.forEach(item => {
        item.classList.add(`${sliderClassNames.rulerItemVertical}`)
      })
    }
  }

  private setListeners = () => {
    const { bar } = this.bar.getDomNode()
    bar.addEventListener('click', this.handleBarClick)

    if (this.ruler) {
      const { ruler } = this.ruler.getDomNode()
      ruler.addEventListener('click', this.handleRulerClick)
    }

    this.toggles.forEach((toggle, toggleIndex: number) => {
      const { handle } = toggle.main.getDomNode()
      const { thumb } = this.state
      if (thumb) {
        const { thumb } = toggle.thumb!.getDomNode()
        thumb.addEventListener('mousedown', (evt: MouseEvent) => {
          this.handleToggleMouseDown(evt, toggleIndex)
        })
      }
      handle.addEventListener('mousedown', (evt: MouseEvent) => {
        this.handleToggleMouseDown(evt, toggleIndex)
      })
    })
  }

  private handleBarClick = (evt: MouseEvent) => {
    evt.preventDefault()
    let activeToggleIndex = 0

    if (this.isRange) {
      const togglesPositions = this.toggles.map((toggle: IToggle): number => {
        const toggleHtml = toggle.main.getHtml() as HTMLElement
        const positionRegExp = this.isVertical ? /(\d*.\d*)%\)/ : /\((\d*.\d*)%/
        const indexForRegExp = 1

        return Number(toggleHtml.getAttribute('style')!.match(positionRegExp)![indexForRegExp])
      })

      const { pageX, pageY } = evt
      const clickCoordinate = this.isVertical ? pageY : pageX
      const offsetDirection = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft
      const offsetSize = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth
      const cleanCoordinate = clickCoordinate - offsetDirection
      const clickPercentOfSize = (cleanCoordinate / offsetSize) * 1000
      const minValuePosition = togglesPositions[0]
      const maxValuePosition = togglesPositions[1]
      const minValueDistance = Math.abs(clickPercentOfSize - minValuePosition)
      const maxValueDistance = Math.abs(clickPercentOfSize - maxValuePosition)

      if (minValuePosition === maxValuePosition) {
        activeToggleIndex = clickPercentOfSize < minValuePosition ? 0 : 1
      } else {
        activeToggleIndex = minValueDistance < maxValueDistance ? 0 : 1
      }
    }

    this.activeToggleIndex = activeToggleIndex
    this.activeToggle = this.toggles[activeToggleIndex].main

    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY })
  }

  private handleRulerClick = (evt: MouseEvent) => {
    const clickNode = evt.target as HTMLElement
    const withRulerItem = clickNode.classList.contains(`${sliderClassNames.rulerItem}`)

    if (withRulerItem) {
      const newValue = +clickNode.textContent!
      const newSliderOptions = { ...this.state }
      const { values } = newSliderOptions

      if (this.isRange) {
        const { start, end } = values
        let newValueIndex
        if (newValue < start) {
          newValueIndex = 0
        }

        const isNewValueInDiapason = newValue > start && newValue < end!
        if (isNewValueInDiapason) {
          newValueIndex = Math.round(newValue / (start + end!))
        }

        if (newValue > end!) {
          newValueIndex = 1
        }

        const isNewValueIndexMoreThenZero = !!newValueIndex && newValueIndex > 0
        if (isNewValueIndexMoreThenZero) {
          values.end = newValue
        } else {
          values.start = newValue
        }
      } else {
        values.start = newValue
      }

      this.dispatchModelOptions(newSliderOptions)
    }
  }

  private handleToggleMouseDown = (evt: MouseEvent, toggleIndex: number) => {
    evt.preventDefault()
    this.activeToggle = this.toggles[toggleIndex].main
    this.activeToggleIndex = toggleIndex
    this.toggles.forEach((toggle, index) => {
      const { toggle: toggleDom } = toggle.main.getDomNode()
      if (index === this.activeToggleIndex) {
        toggleDom.classList.add(sliderClassNames.toggleActive)
      } else {
        toggleDom.classList.remove(sliderClassNames.toggleActive)
      }
    })
    document.addEventListener('mousemove', this.handleToggleMove)
    document.addEventListener('mouseup', this.handleToggleUp)
  }

  private handleToggleMove = (evt: MouseEvent) => {
    evt.preventDefault()
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY })
  }

  private handleToggleUp = (evt: MouseEvent) => {
    evt.preventDefault()
    document.removeEventListener('mousemove', this.handleToggleMove)
    document.removeEventListener('mouseup', this.handleToggleUp)
  }

  private changeCurrentValue = (clickCoordinate: ClickCoordinate) => {
    const cleanCoordinate = this.getCleanCoordinate(clickCoordinate)
    const percentOfSlider = this.getPercent(cleanCoordinate)
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider)
    const newSliderOptions = { ...this.state } as ModelState

    enum indexMap {
      min,
      max,
    }

    const currentValueKey = indexMap[this.activeToggleIndex] as 'start' | 'end'

    if (this.isRange) {
      const isFirstValue = this.activeToggleIndex === 0
      const isLastValue = this.activeToggleIndex === 1
      const minOutRange = isFirstValue ? newSliderOptions.values.end : newSliderOptions.values.start
      const maxOutRange = isLastValue ? newSliderOptions.values.start : newSliderOptions.values.end

      if (isFirstValue) {
        const isOutOfRange = newCurrentValue >= maxOutRange!
        newSliderOptions.values[currentValueKey]! = isOutOfRange ? maxOutRange! : newCurrentValue
      } else if (isLastValue) {
        const isOutOfRange = newCurrentValue <= minOutRange!
        newSliderOptions.values[currentValueKey]! = isOutOfRange ? minOutRange! : newCurrentValue
      }
    } else {
      newSliderOptions.values[currentValueKey] = newCurrentValue
    }

    this.dispatchModelOptions(newSliderOptions)
  }

  private getPercent = (value: number): number => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth
    let percent = value / offset
    if (percent > 1) percent = 1
    if (percent < 0) percent = 0
    return percent
  }

  private getCurrentValueByPercent = (percent: number): number => {
    const { range } = this.state
    const newCurrentValue = percent * (range.max - range.min) + range.min
    return Number(this.getStepCurrentValue(newCurrentValue).toLocaleString('en', { useGrouping: false }))
  }

  private getStepCurrentValue = (currentValue: number): number => {
    const { step, range } = this.state
    let stepCurrentValue = Math.round((currentValue - range.min) / step) * step + range.min
    const isLastStepLess = currentValue - range.max === 0

    if (isLastStepLess) {
      stepCurrentValue = range.max
    }

    if (stepCurrentValue >= range.max) {
      stepCurrentValue = range.max
    }

    return stepCurrentValue
  }

  private dispatchModelOptions = (modelOptions: ModelState) => {
    this.notify(ObserverEvents.modelStateUpdate, modelOptions)
  }

  updateStateOptions = (state: ModelState) => {
    this.state = state
    this.redrawValue()
  }

  getRulerValues = () => this.ruler!.getRulerValues()

  private redrawValue = () => {
    this.bar.updateProps(this.getBarProps())
    const { ruler } = this.state
    const isOldRulerUpdate = !ruler && this.ruler && this.hasRulerPropsChange()
    const isNewRulerUpdate = ruler && this.ruler && this.hasRulerPropsChange()
    const isRulerMustBeUpdate = isOldRulerUpdate || isNewRulerUpdate

    if (isRulerMustBeUpdate) {
      this.ruler!.updateProps(this.getRulerProps())
    }

    const { values, thumb } = this.state

    Object.entries(values).forEach(([key, value]) => {
      const toggleIndexMap = { min: 0, max: 1 }
      const index = toggleIndexMap[key as 'min' | 'max']
      const scalePosition = this.bar.getPosition(value!)
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical }
      this.toggles[index].main.updateProps(toggleProps)

      const { thumb } = this.toggles[index]
      const isThumbExist = thumb && !!thumb

      if (isThumbExist) {
        thumb!.updateProps(this.getThumbProps(value!))
      }
    })
  }

  private hasRulerPropsChange = (): boolean => {
    const oldRulerProps = this.ruler!.getProps()
    const newRulerProps = this.getRulerProps()
    return JSON.stringify(oldRulerProps) !== JSON.stringify(newRulerProps)
  }
}

export default View
