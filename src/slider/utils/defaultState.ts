import { ModelState } from './interfaces/Model'

const defaultState: ModelState = {
  currentValues: { start: 15 },
  range: { min: 0, max: 100 },
  ruler: true,
  thumb: true,
  step: 1,
  orientation: 'horizontal',
}

export default defaultState
