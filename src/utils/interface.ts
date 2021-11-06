// default state
interface IState {
  min: number
  max: number
  step: number
  values: number[]
}

interface OnlyNumbers {
  [ket: string]: number
}

type Steps = Array<{ value: number; px: number }>
type Directions = 'horizontal' | 'vertical'
type Types = 'single' | 'interval'

interface ViewValues {
  pxValue?: number
  value?: number
  edge?: number
  left?: number
  target?: HTMLElement
  pxValues?: number[]
  values?: number[]
  handles?: NodeList
  steps?: Steps
}

interface VisualState {
  scale: boolean
  direction: Directions
  skin: 'green' | 'red'
  bar: boolean
  tip: boolean
  type: Types
  settings: boolean
}

type EventCallback = (data?: any) => void

interface Subscribers {
  [key: string]: EventCallback[]
}

export { IState, OnlyNumbers, Steps, ViewValues, EventCallback, Subscribers, VisualState }
