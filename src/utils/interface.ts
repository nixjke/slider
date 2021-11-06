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

type EventCallback = (data?: any) => void

interface Subscribers {
  [key: string]: EventCallback[]
}

export { IState, OnlyNumbers, Steps, ViewValues, EventCallback, Subscribers }
