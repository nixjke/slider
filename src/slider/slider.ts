import 'normalize.css'
import './style/index.scss'
import Observer from './Observer/Observer'
import ObserverEvents from './Observer/ObserverEvents'
import Presenter from './Presenter/Presenter'
import { ModelState } from './utils/interfaces/Model'
import defaultState from './utils/defaultState'

class Slider extends Observer {
  private presenter: Presenter

  constructor(domParent: HTMLElement, modelState = defaultState) {
    super()
    this.presenter = new Presenter(domParent, modelState)
    this.init()
  }

  init(): void {
    this.presenter.init()
    this.presenter.on(ObserverEvents.modelStateUpdate, this.alertSubs)
  }

  updateState(modelState: ModelState) {
    this.presenter.updateState(modelState)
  }

  getModelState() {
    return this.presenter.getModelState()
  }

  getDomParent() {
    return this.presenter.getDomParent()
  }

  getRulerValues() {
    return this.presenter.getRulerValues()
  }

  private alertSubs = () => {
    this.notify(ObserverEvents.modelStateUpdate, this.getModelState())
  }
}

export default Slider
