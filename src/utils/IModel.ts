import { values } from './types'

interface IModel {
  values: values
  range: { min: number; max: number }
  ruler: boolean
  thumb: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export default IModel
