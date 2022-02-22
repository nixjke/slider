import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import Model from '../Model/Model'
import View from '../View/View'
import { ModelState } from '../utils/interfaces/Model'

class Presenter extends Observer {
  private modelState: ModelState
  private model: Model
  private view: View
  private domParent: HTMLElement

  constructor(domParent: HTMLElement, modelState: ModelState) {
    super()
    this.domParent = domParent
    this.modelState = modelState
    this.model = new Model(this.getSplitModelOptions(modelState))
    this.view = new View(this.model.getState(), this.domParent)
  }

  init() {
    this.subscribeModules()
    this.view.render()
  }

  updateState(modelState: ModelState) {
    this.checkOnChangeRange(modelState)
    this.checkOnChangeOrientation(modelState)
    this.checkOnChangeThumbDisplay(modelState)
    this.model.updateOptions(this.getSplitModelOptions(modelState))
  }

  getModelOptions() {
    return this.model.getState()
  }

  getDomParent() {
    return this.domParent
  }

  getRulerValues() {
    return this.view.getRulerValues()
  }

  private getSplitModelOptions = (modelState: ModelState): ModelState => {
    const { currentValues, range, ruler, thumb, step, orientation } = modelState

    return {
      currentValues,
      range,
      ruler,
      thumb,
      step,
      orientation,
    }
  }

  private subscribeModules  ()  {
    this.model.on(ObserverEvents.modelStateUpdate, this.onModelOptionsUpdate)
    this.view.on(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
  }

  private onModelOptionsUpdate (modelOptions: ModelState) {
    this.view.updateModelState(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private onViewChangedModelOptions (modelOptions: ModelState) {
    this.model.updateOptions(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private checkOnChangeRange  (modelOptions: ModelState)  {
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
