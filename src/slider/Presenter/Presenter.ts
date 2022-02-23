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

  private getSplitModelOptions(modelState: ModelState): ModelState {
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

  private subscribeModules() {
    this.model.on(ObserverEvents.modelStateUpdate, this.onModelOptionsUpdate)
    this.view.on(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
  }

  private onModelOptionsUpdate(modelState: ModelState) {
    this.view.updateModelState(modelState)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private onViewChangedModelOptions(modelState: ModelState) {
    this.model.updateOptions(modelState)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getState())
  }

  private checkOnChangeRange(modelState: ModelState) {
    const { currentValues: oldCurrentValues } = this.model.getState()
    const { currentValues: newCurrentValues } = modelState
    const isOldRange = oldCurrentValues.hasOwnProperty('max')
    const isNewRange = newCurrentValues.hasOwnProperty('max')
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange)

    if (isRangeChange) {
      this.renderNewView(modelState)
    }
  }

  private checkOnChangeOrientation = (modelState: ModelState) => {
    const { orientation: oldOrientation } = this.model.getState()
    const { orientation: newOrientation } = modelState
    const isOrientationChange = oldOrientation !== newOrientation

    if (isOrientationChange) {
      this.renderNewView(modelState)
    }
  }

  private checkOnChangeThumbDisplay = (modelState: ModelState) => {
    const { thumb: oldWithThumb } = this.model.getState()
    const { thumb: newWithThumb } = modelState
    const isWithThumbChange = oldWithThumb !== newWithThumb

    if (isWithThumbChange) {
      this.renderNewView(modelState)
    }
  }

  private renderNewView = (modelState: ModelState) => {
    this.view.destroyDom()
    this.view = new View(modelState, this.domParent)
    this.view.on(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
    this.view.render()
  }
}

export default Presenter
