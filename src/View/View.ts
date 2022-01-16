import Observer from '../Observer/Observer'
import ModelState from '../utils/IModel'

import Bar from './components/bar/Bar'
import Ruler from './components/ruler/Ruler'
import Thumb from './components/thumb/Thumb'
import Toggle from './components/toggle/Toggle'

import sliderClassNames from '../utils/sliderClassNames'

import IToggle from '../utils/interfaces/view/components/toggle/IToggle'

import './components/bar/bar.scss'
import './components/toggle/toggle.scss'
import './components/thumb/thumb.scss'
import './components/ruler/ruler.scss'

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
  }

  private getCoordinate(clickCoordinate: ClickCoordinate): number {}

  private createSliderContainer() {}
}

export default View
