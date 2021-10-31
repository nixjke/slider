import Model from '../Model/Model'
import View from '../View/View'

import { IOptions } from '../utils/interface'

class Presenter {
  private options: IOptions

  constructor(options: IOptions) {
    this.options = options
  }

  init() {
    const model = new Model(this.options)
    const view = new View(model.getStart(), model.getRange(), model.getCurrentValue())
    view.render()
  }
}

export default Presenter
