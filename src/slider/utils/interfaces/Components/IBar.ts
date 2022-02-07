import { CurrentValues } from '../Model'

interface BarProps {
  currentValues: CurrentValues
  range: { min: number; max: number }
  isVertical: boolean
}

interface DomNode {
  bar: HTMLElement
  scale: HTMLElement
}

export { BarProps, DomNode }
