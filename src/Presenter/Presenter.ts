import Model from '../Model/Model'
import View from '../View/View'
import { Observer, ObserverEvents } from '../Observer/Observer'

import { IOptions } from '../utils/interface'

class Presenter extends Observer {
  private options: IOptions
  private element

  constructor(element: any, options: IOptions) {
    super()
    this.options = options
    this.element = element
    this.init()
  }

  init() {
    console.log(this.element)
    const model = new Model(this.options)
    const view = new View(model.getStart(), model.getRange(), model.getCurrentValue())
    view.render()
  }
}

export default Presenter