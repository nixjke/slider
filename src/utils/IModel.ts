import values from './types'

interface ModelState {
  values: values
  range: { start: number; end: number }
  ruler: boolean
  thumb: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export default ModelState
