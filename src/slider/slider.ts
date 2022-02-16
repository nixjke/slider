import 'normalize.css'

const slider = document.querySelector('js-range-slider') as HTMLElement

import Presenter from './Presenter/Presenter'

new Presenter(slider, {
  currentValues: { start: 0 },
  orientation: 'horizontal',
  range: {min: 0, max: 100},
  ruler: true,
  step: 1,
  thumb: true,
})
