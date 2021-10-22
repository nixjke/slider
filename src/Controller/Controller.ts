import { Model } from '../Model/Model'
import { View } from '../View/View'

class Controller {
  private model = new Model({
    min: 1,
    max: 100,
    value: 30,
    values: [30, 60],
    step: 5,
  })
  private view = new View()

  constructor() {
    this.view.renderTemplate({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'double',
    })
  }
}

export { Controller }
