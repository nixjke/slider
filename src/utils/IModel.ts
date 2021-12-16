import { values } from './types'

interface IModelState {
  values: values
  range: { min: number; max: number }
  scale: boolean
  tip: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export default IModelState
