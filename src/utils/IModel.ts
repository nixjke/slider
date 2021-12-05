import { values } from './types'

interface IModel {
  values: values
  range: { min: number; max: number }
  scale: boolean
  tip: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export default IModel
