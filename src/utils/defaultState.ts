import IModel from './IModel'

const defaultState: IModel = {
  values: { start: 10 },
  range: {
    min: 0,
    max: 100,
  },
  scale: true,
  tip: false,
  step: 1,
  orientation: 'horizontal',
}

export default defaultState