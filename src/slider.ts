import Observer from './Observer/Observer'
import Presenter from './Presenter/Presenter'
import ISliderOptions from './utils/ISliderOprions'
import ModelState from './utils/IModel'
import ObserverEvents from './Observer/ObserverEvents'

class Slider extends Observer {
  private presenter: Presenter

  constructor(sliderOptions: ISliderOptions) {
    super()
    this.presenter = new Presenter(sliderOptions)
  }

  init() {
    this.presenter.init()
    this.presenter.on(ObserverEvents.modelStateUpdate, this.alertSubs)
  }

  updateOptions(modelOptions: ModelState) {
    this.presenter.updateOptions(modelOptions)
  }

  getModelOptions = () => this.presenter.getModelOptions()

  getDomParent = () => this.presenter.getDomParent()

  getRulerValues = () => this.presenter.getRulerValues()

  private alertSubs = () => {
    this.notify(ObserverEvents.modelStateUpdate, this.getModelOptions())
  }
}

export default Slider
