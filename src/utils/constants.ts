import { IState, VisualState } from '../utils/interface'

const defaultModel: IState = {
  min: 0,
  max: 100,
  step: 1,
  values: [20],
}

const constants = {
  DIRECTION_VERTICAL: 'vertical',
  DIRECTION_HORIZONTAL: 'horizontal',
  TYPE_INTERVAL: 'interval',
  TYPE_SINGLE: 'single',
}

const defaultVisualModel: VisualState = {
  direction: 'horizontal',
  skin: 'green',
  bar: true,
  tip: true,
  type: 'single',
  scale: false,
  settings: false,
}

export { defaultModel, constants, defaultVisualModel }
