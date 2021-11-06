import { HandleInterface } from '../View/Factories/SubView/Handle/Handle';
import { BarInterface } from '../View/Factories/SubView/Bar/Bar';
import { ITip } from '../View/Factories/SubView/Tip/Tip';
import { Scale } from '../View/Factories/SubView/Scale/Scale';
import Settings from '../View/Factories/SubView/Settings/Settings';

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

interface GState {
  [key: string]: number | string | number[] | HTMLElement
}

type ForMouseMove = {
  shiftX: number
  shiftY: number
  data: { wrapper: HTMLElement; state: VisualState }
  target: HTMLElement
}

interface UI {
  handle?: HandleInterface;
  bar?: BarInterface;
  tip?: ITip;
  scale?: Scale;
  settings?: Settings;
}

export {
  IState,
  OnlyNumbers,
  Steps,
  ViewValues,
  EventCallback,
  Subscribers,
  Directions,
  VisualState,
  GState,
  ForMouseMove,
  UI
}
