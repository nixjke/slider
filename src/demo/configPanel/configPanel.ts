import configPanelClassName from './configPanelClassName'
import sliderClassNames from '../../slider/utils/sliderClassNames'
import Slider from '../../slider/slider'
import ObserverEvents from '../../slider/Observer/ObserverEvents'
import { ModelState } from '../../slider/utils/interfaces/Model'
import { CurrentValues } from '../../slider/utils/interfaces/Model'

const configPanelTemplate = require('./configPanel.hbs')

type DomElements = {
  valuesContainer: HTMLElement
  currentValueContainer: HTMLElement
  currentValueInput: HTMLInputElement
  maxCurrentValueContainer: HTMLElement
  maxCurrentValueInput: HTMLInputElement
  stepInput: HTMLInputElement
  minRangeInput: HTMLInputElement
  maxRangeInput: HTMLInputElement
  thumbCheckbox: HTMLInputElement
  rulerCheckbox: HTMLInputElement
  diapasonCheckbox: HTMLInputElement
  verticalCheckbox: HTMLInputElement
}

class ConfigPanel {
  domParent: HTMLElement
  slider: Slider
  domElements!: DomElements

  constructor(domParent: HTMLElement, slider: Slider) {
    this.slider = slider
    this.domParent = domParent
    this.init()
  }

  init() {
    this.renderPanel()
    this.slider.on(ObserverEvents.modelStateUpdate, this.onStateUpdate)
  }

  private renderPanel() {
    this.mountPanel()
    this.saveDom()
    this.toggleHangingInputs()
    this.setListeners()
  }

  private mountPanel() {
    this.domParent.appendChild(this.getPanelContainer())
  }

  private getPanelContainer(): HTMLDivElement {
    const configPanelContainer = document.createElement('div')
    const classNames = { ...configPanelClassName }
    const { currentValues, range, ruler, thumb, step, orientation } = this.slider.getModelState()
    const configPanelOptions = {
      classNames,
      currentValues,
      range,
      ruler,
      thumb,
      step,
      isRange: this.hasRange(),
      isVertical: orientation === 'vertical',
    }

    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions)
    return configPanelContainer
  }

  private toggleHangingInputs() {
    const { maxCurrentValueContainer } = this.domElements
    const { hidedValueContainer } = configPanelClassName

    if (this.hasRange()) {
      maxCurrentValueContainer.classList.remove(hidedValueContainer)
    } else {
      maxCurrentValueContainer.classList.add(hidedValueContainer)
    }
  }

  private saveDom() {
    const {
      valuesContainer: valuesContainerClass,
      stepInput: stepInputClass,
      minRangeInput: minRangeInputClass,
      maxRangeInput: maxRangeInputClass,
      thumbCheckbox: thumbCheckboxClass,
      rulerCheckbox: rulerCheckboxClass,
      diapasonCheckbox: diapasonCheckboxClass,
      verticalCheckbox: verticalCheckboxClass,
      currentValueContainer: currentValueContainerClass,
      currentValueInput: currentValueInputClass,
      maxCurrentValueContainer: maxCurrentValueContainerClass,
      maxCurrentValueInput: maxCurrentValueInputClass,
    } = configPanelClassName

    const valuesContainer = this.domParent.querySelector(`.${valuesContainerClass}`) as HTMLElement
    const currentValueContainer = this.domParent.querySelector(`.${currentValueContainerClass}`) as HTMLElement

    const currentValueInput = this.domParent.querySelector(`.${currentValueInputClass}`) as HTMLInputElement

    const stepInput = this.domParent.querySelector(`.${stepInputClass}`) as HTMLInputElement

    const minRangeInput = this.domParent.querySelector(`.${minRangeInputClass}`) as HTMLInputElement

    const maxRangeInput = this.domParent.querySelector(`.${maxRangeInputClass}`) as HTMLInputElement

    const thumbCheckbox = this.domParent.querySelector(`.${thumbCheckboxClass}`) as HTMLInputElement

    const rulerCheckbox = this.domParent.querySelector(`.${rulerCheckboxClass}`) as HTMLInputElement

    const diapasonCheckbox = this.domParent.querySelector(`.${diapasonCheckboxClass}`) as HTMLInputElement

    const verticalCheckbox = this.domParent.querySelector(`.${verticalCheckboxClass}`) as HTMLInputElement

    const maxCurrentValueContainer = this.domParent.querySelector(`.${maxCurrentValueContainerClass}`) as HTMLElement

    const maxCurrentValueInput = this.domParent.querySelector(`.${maxCurrentValueInputClass}`) as HTMLInputElement

    this.domElements = {
      valuesContainer,
      currentValueContainer,
      currentValueInput,
      maxCurrentValueContainer,
      maxCurrentValueInput,
      stepInput,
      minRangeInput,
      maxRangeInput,
      thumbCheckbox,
      rulerCheckbox,
      diapasonCheckbox,
      verticalCheckbox,
    }
  }

  private setListeners() {
    const {
      currentValueInput,
      stepInput,
      maxCurrentValueInput,
      minRangeInput,
      maxRangeInput,
      thumbCheckbox,
      rulerCheckbox,
      diapasonCheckbox,
      verticalCheckbox,
    } = this.domElements

    currentValueInput.addEventListener('input', this.handleInput)
    stepInput.addEventListener('input', this.handleInput)
    minRangeInput.addEventListener('input', this.handleInput)
    maxRangeInput.addEventListener('input', this.handleInput)

    thumbCheckbox.addEventListener('change', this.handleCheckboxChange)
    rulerCheckbox.addEventListener('change', this.handleCheckboxChange)
    diapasonCheckbox.addEventListener('change', this.handleDiapasonChange)
    verticalCheckbox.addEventListener('change', this.handleVerticalChange)

    if (this.hasRange()) {
      maxCurrentValueInput.addEventListener('input', this.handleInput)
    }
  }

  private handleInput = () => {
    const newOptions = this.getNewModelOptions()
    this.slider.updateState(newOptions)
  }

  private getNewModelOptions(): ModelState {
    const { minRangeInput, maxRangeInput, currentValueInput, maxCurrentValueInput, stepInput } = this.domElements
    const newOptions: ModelState = { ...this.slider.getModelState() }

    newOptions.step = +stepInput.value

    const newRange = {
      min: +minRangeInput.value,
      max: +maxRangeInput.value,
    }

    newOptions.range = newRange

    const currentValues: CurrentValues = { min: +currentValueInput.value }

    if (this.hasRange()) {
      currentValues.max = +maxCurrentValueInput.value
    }

    newOptions.currentValues = currentValues

    return newOptions
  }

  private handleCheckboxChange = (evt: Event) => {
    const target = <HTMLInputElement>evt.target
    const nameOptions = target.getAttribute('data-value-name') as 'ruler' | 'thumb'
    const newOptions = { ...this.slider.getModelState() }
    newOptions[nameOptions] = target.checked
    this.slider.updateState(newOptions)
  }

  private handleVerticalChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelState() }
    const newIsVertical = (<HTMLInputElement>evt.target).checked
    newOptions.orientation = newIsVertical ? 'vertical' : 'horizontal'
    this.toggleOrientation()
    this.slider.updateState(newOptions)
  }

  private handleDiapasonChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelState() }
    const newCurrentValues = { ...this.slider.getModelState().currentValues }
    const newIsRange = (<HTMLInputElement>evt.target).checked

    if (newIsRange) {
      const { range } = newOptions
      newCurrentValues.max = range.max
    } else {
      delete newCurrentValues.max
    }

    newOptions.currentValues = newCurrentValues
    this.slider.updateState(newOptions)
  }

  private toggleOrientation() {
    const { wrap } = sliderClassNames
    const { verticalSlider } = configPanelClassName
    const sliderParent = this.slider.getDomParent()
    const sliderWrap = sliderParent.querySelector(`.${wrap}`) as HTMLElement
    sliderParent.classList.toggle(verticalSlider)
    sliderWrap.classList.toggle(verticalSlider)
  }

  private onStateUpdate = () => {
    const {
      minRangeInput,
      maxRangeInput,
      currentValueInput,
      maxCurrentValueInput,
      stepInput,
      rulerCheckbox,
      thumbCheckbox,
    } = this.domElements

    const { currentValues, step, range, ruler, thumb } = this.slider.getModelState()

    stepInput.value = `${step}`
    minRangeInput.value = `${range.min}`
    maxRangeInput.value = `${range.max}`
    rulerCheckbox.checked = ruler
    thumbCheckbox.checked = thumb

    if (this.hasRange()) {
      currentValueInput.value = `${currentValues.min}`
      maxCurrentValueInput.value = `${currentValues.max}`
      maxCurrentValueInput.addEventListener('input', this.handleInput)
    } else {
      currentValueInput.value = `${currentValues.min}`
    }

    this.toggleHangingInputs()
  }

  private hasRange(): boolean {
    const { currentValues } = this.slider.getModelState()
    return currentValues.hasOwnProperty('max')
  }
}

export default ConfigPanel
