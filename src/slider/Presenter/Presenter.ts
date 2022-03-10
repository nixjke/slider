import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import Model from '../Model/Model'
import View from '../View/View'
import { ModelState } from '../utils/interfaces/Model'

class Presenter extends Observer {
  private model: Model
  private view: View
  private domParent: HTMLElement

  constructor(domParent: HTMLElement, modelState: ModelState) {
    super()
    this.domParent = domParent
    this.model = new Model(this.getSplitModelOptions(modelState))
    this.view = new View(this.model.getState(), this.domParent)
  }

  init() {
    this.onModules()
    this.view.render()
  }

  updateState(modelState: ModelState) {
    this.checkOnChangeRange(modelState)
    this.checkOnChangeOrientation(modelState)
    this.checkOnChangeThumbDisplay(modelState)
    this.model.updateState(this.getSplitModelOptions(modelState))
  }

  getModelOptions = () => this.model.getState()

  getDomParent = () => this.domParent

  getRulerValues = () => this.view.getRulerValues()

  private getSplitModelOptions = (ModelState: ModelState): ModelState => {
    const { currentValues, range, ruler, thumb, step, orientation } = ModelState

    return {
      currentValues,
      range,
      ruler,
      thumb,
      step,
      orientation,
    }
  }

  private onModules = () => {
    this.model.on(ObserverEvents.modelStateUpdate, this.onmodelStateUpdate)
    this.view.on(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
  }

  private onmodelStateUpdate = (modelOptions: ModelState) => {
    this.view.updateModelState(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private onViewChangedModelOptions = (modelOptions: ModelState) => {
    this.model.updateState(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private checkOnChangeRange = (modelOptions: ModelState) => {
    const { currentValues: oldCurrentValues } = this.model.getState()
    const { currentValues: newCurrentValues } = modelOptions
    const isOldRange = oldCurrentValues.hasOwnProperty('max')
    const isNewRange = newCurrentValues.hasOwnProperty('max')
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange)

    if (isRangeChange) {
      this.renderNewView(modelOptions)
    }
  }

  private checkOnChangeOrientation = (modelOptions: ModelState) => {
    const { orientation: oldOrientation } = this.model.getState()
    const { orientation: newOrientation } = modelOptions
    const isOrientationChange = oldOrientation !== newOrientation

    if (isOrientationChange) {
      this.renderNewView(modelOptions)
    }
  }

  private checkOnChangeThumbDisplay = (modelOptions: ModelState) => {
    const { thumb: oldWithThumb } = this.model.getState()
    const { thumb: newWithThumb } = modelOptions
    const isWithThumbChange = oldWithThumb !== newWithThumb

    if (isWithThumbChange) {
      this.renderNewView(modelOptions)
    }
  }

  private renderNewView = (modelOptions: ModelState) => {
    this.view.destroyDom()
    this.view = new View(modelOptions, this.domParent)
    this.view.on(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
    this.view.render()
  }
}

export default Presenter
