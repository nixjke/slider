import values from './types'

interface ModelState {
  values: values
  range: { min: number; max: number }
  ruler: boolean
  thumb: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export default ModelState
