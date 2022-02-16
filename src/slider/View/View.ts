import Observer from '../Observer/Observer'
import { BarProps } from '../utils/interfaces/Components/IBar'
import { ModelState } from '../utils/interfaces/Model'

import Bar from './components/bar/Bar'

class View extends Observer {
  private modelState: ModelState
  private domParent: HTMLElement
  private bar!: Bar

  constructor(modelState: ModelState, domParent: HTMLElement) {
    super()
    this.modelState = modelState
    this.domParent = domParent
    this.initViewComoponents()
    console.log(this.bar)
  }

  private initViewComoponents() {
    this.bar = this.getBar()
  }

  private getBar() {
    return new Bar(this.getBarProps())
  }

  private getBarProps(): BarProps {
    const { currentValues, range } = this.modelState
    return { currentValues, range, isVertical: true }
  }
}

export default View
