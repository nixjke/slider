import Model from '../Model/Model'
import View from '../View/View'

class Presenter {
  private model
  private view

  constructor() {
    this.model = new Model()
    this.view = new View()
  }
}
