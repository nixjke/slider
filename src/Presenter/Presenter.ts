import Model from '../Model/Model'
import View from '../View/View'
import { Observer, ObserverEvents } from '../Observer/Observer'

import { IOptions } from '../utils/interface'

class Presenter extends Observer {
  private options: IOptions

  constructor(options: IOptions) {
    super()
    this.options = options
    this.init()
  }

  init() {
    const model = new Model(this.options)
    const view = new View(model.getStart(), model.getRange(), model.getCurrentValue())
    view.render()
  }
}

export default Presenter