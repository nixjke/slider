type CurrentValues = { min: number; max?: number }

interface ModelState {
  currentValues: CurrentValues
  range: { min: number; max: number }
  ruler: boolean
  thumb: boolean
  step: number
  orientation: 'horizontal' | 'vertical'
}

export { CurrentValues, ModelState }
