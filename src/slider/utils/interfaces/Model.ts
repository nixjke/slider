type currentValues = { start: number; end?: number }

interface ModelState {
  currentValues: currentValues
  range: { min: number; max: number }
  ruler: boolean
  thumb: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export { currentValues, ModelState }
