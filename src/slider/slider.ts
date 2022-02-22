import 'normalize.css'
import './style/index.scss'
import Observer from './Observer/Observer'
import ObserverEvents from './Observer/ObserverEvents'
import Presenter from './Presenter/Presenter'
import { ModelState } from './utils/interfaces/Model'

const slider = document.querySelector('.js-range-slider') as HTMLElement

class Slider extends Observer {
  private presenter: Presenter

  constructor(domParent: HTMLElement, modelState: ModelState) {
    super()
    this.presenter = new Presenter(domParent, modelState)
    this.init()
  }

  init() {
    this.presenter.init()
    this.presenter.on(ObserverEvents.modelStateUpdate, this.alertSubs)
  }

  updateOptions = (modelState: ModelState) => {
    this.presenter.updateState(modelState)
  }

  getModelOptions = () => this.presenter.getModelOptions()

  getDomParent = () => this.presenter.getDomParent()

  getRulerValues = () => this.presenter.getRulerValues()

  private alertSubs = () => {
    this.notify(ObserverEvents.modelStateUpdate, this.getModelOptions())
  }
}

new Slider(slider, {
  currentValues: { min: 0 },
  orientation: 'horizontal',
  range: { min: 0, max: 100},
  ruler: true,
  step: 1,
  thumb: true
})
