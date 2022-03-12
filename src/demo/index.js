import './index.scss'
import Slider from '../slider/slider'
import ConfigPanel from './configPanel/configPanel'

const defaultSlider = new Slider(document.querySelector('.js-default-slider'), {
  currentValues: { min: 20 },
  orientation: 'horizontal',
  range: { min: 0, max: 100 },
  ruler: false,
  step: 1,
  thumb: false,
})

const rangeSlider = new Slider(document.querySelector('.js-range-slider'), {
  currentValues: { min: 20, max: 80 },
  orientation: 'horizontal',
  range: { min: 0, max: 100 },
  ruler: false,
  step: 1,
  thumb: false,
})

const sliderStep = new Slider(document.querySelector('.js-step-slider'), {
  currentValues: { min: 20 },
  orientation: 'horizontal',
  range: { min: 0, max: 100 },
  ruler: true,
  step: 1,
  thumb: true,
})

const verticalSlider = new Slider(document.querySelector('.js-vertical-slider'), {
  currentValues: { min: 20, max: 80 },
  orientation: 'vertical',
  range: { min: 0, max: 100 },
  ruler: true,
  step: 1,
  thumb: true,
})

new ConfigPanel(document.querySelector('.js-default-slider-config'), defaultSlider)
new ConfigPanel(document.querySelector('.js-range-slider-config'), rangeSlider)
new ConfigPanel(document.querySelector('.js-step-slider-config'), sliderStep)
new ConfigPanel(document.querySelector('.js-vertical-slider-config'), verticalSlider)
