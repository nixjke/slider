import Model from '../Model/Model'
import View from '../View/View'
import Observer from '../Observer/Observer'
import ObserverEvents from '../Observer/ObserverEvents'
import ModelState from '../utils/IModel'
import ISliderOptions from '../utils/ISliderOprions'

class Presenter extends Observer {
  private model: Model

  private view: View

  private domParent: HTMLElement

  constructor(sliderOptions: ISliderOptions) {
    super()
    this.domParent = sliderOptions.domParent
    this.model = new Model(this.getSplitModelOptions(sliderOptions))
    this.view = new View(this.model.getOptions(), sliderOptions.domParent)
  }

  init = () => {
    this.subscribeModules()
    this.view.render()
  }

  updateOptions = (modelOptions: ModelState) => {
    this.checkOnChangeRange(modelOptions)
    this.checkOnChangeOrientation(modelOptions)
    this.checkOnChangeThumbDisplay(modelOptions)
    this.model.updateOptions(this.getSplitModelOptions(modelOptions))
  }

  getModelOptions = () => this.model.getOptions()

  getDomParent = () => this.domParent

  getRulerValues = () => this.view.getRulerValues()

  private getSplitModelOptions = (sliderOptions: ISliderOptions | ModelState): ModelState => {
    const { values, range, ruler, thumb, step, orientation } = sliderOptions

    return {
      values,
      range,
      ruler,
      thumb,
      step,
      orientation,
    }
  }

  private subscribeModules = () => {
    this.model.subscribe(ObserverEvents.modelStateUpdate, this.onmodelStateUpdate)
    this.view.subscribe(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
  }

  private onmodelStateUpdate = (modelOptions: ModelState) => {
    this.view.updateStateOptions(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getOptions())
  }

  private onViewChangedModelOptions = (modelOptions: ModelState) => {
    this.model.updateOptions(modelOptions)
    this.notify(ObserverEvents.modelStateUpdate, this.model.getOptions())
  }

  private checkOnChangeRange = (modelOptions: ModelState) => {
    const { values: oldvalues } = this.model.getOptions()
    const { values: newvalues } = modelOptions
    const isOldRange = oldvalues.hasOwnProperty('max')
    const isNewRange = newvalues.hasOwnProperty('max')
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange)

    if (isRangeChange) {
      this.renderNewView(modelOptions)
    }
  }

  private checkOnChangeOrientation = (modelOptions: ModelState) => {
    const { orientation: oldOrientation } = this.model.getOptions()
    const { orientation: newOrientation } = modelOptions
    const isOrientationChange = oldOrientation !== newOrientation

    if (isOrientationChange) {
      this.renderNewView(modelOptions)
    }
  }

  private checkOnChangeThumbDisplay = (modelOptions: ModelState) => {
    const { thumb: oldthumb } = this.model.getOptions()
    const { thumb: newthumb } = modelOptions
    const isthumbChange = oldthumb !== newthumb

    if (isthumbChange) {
      this.renderNewView(modelOptions)
    }
  }

  private renderNewView = (modelOptions: ModelState) => {
    this.view.destroyDom()
    this.view = new View(modelOptions, this.domParent)
    this.view.subscribe(ObserverEvents.modelStateUpdate, this.onViewChangedModelOptions)
    this.view.render()
  }
}

export default Presenter
