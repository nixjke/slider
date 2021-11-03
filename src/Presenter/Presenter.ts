import Model from '../Model/Model'
import View from '../View/View'
import { Observer, ObserverEvents } from '../Observer/Observer'

import { IOptions } from '../utils/interface'

class Presenter extends Observer {
  private anchor: HTMLElement
  private options: IOptions

  constructor(anchor: HTMLElement, options: IOptions) {
    super()
    this.anchor = anchor
    this.options = options
    this.init()
  }

  init() {
    const model = new Model(this.options)
    const view = new View(this.anchor, model.getStart(), model.getRange(), model.getCurrentValue())
    view.render()
  }
}

export default Presenter