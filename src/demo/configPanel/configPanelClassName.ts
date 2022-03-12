interface IConfigPanelClassName {
  minCurrentValueContainer: string
  maxCurrentValueContainer: string
  minCurrentValueInput: string
  maxCurrentValueInput: string
  verticalSlider: string
  currentValueContainer: string
  currentValueInput: string
  valuesContainer: string
  valueContainer: string
  valueLabel: string
  stepInput: string
  minRangeInput: string
  maxRangeInput: string
  thumbCheckbox: string
  rulerCheckbox: string
  diapasonCheckbox: string
  verticalCheckbox: string
  hidedValueContainer: string
}

const configPanelClassName: IConfigPanelClassName = {
  minCurrentValueContainer: 'config-panel__value_current-min-value',
  maxCurrentValueContainer: 'config-panel__value_current-max-value',
  minCurrentValueInput: 'current-min-value',
  maxCurrentValueInput: 'current-max-value',
  verticalSlider: 'config-panel__slider_vertical',
  currentValueContainer: 'config-panel__value_current-value',
  currentValueInput: 'current-value',
  valuesContainer: 'config-panel__values',
  valueContainer: 'config-panel__value',
  valueLabel: 'config-panel__label',
  stepInput: 'step',
  minRangeInput: 'min-range-value',
  maxRangeInput: 'max-range-value',
  thumbCheckbox: 'thumb-show',
  rulerCheckbox: 'ruler-show',
  diapasonCheckbox: 'diapason',
  verticalCheckbox: 'vertical',
  hidedValueContainer: 'config-panel__value--hided',
}

export default configPanelClassName
