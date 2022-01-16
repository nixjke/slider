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

  private createSliderContainer() {}
}

export default View
