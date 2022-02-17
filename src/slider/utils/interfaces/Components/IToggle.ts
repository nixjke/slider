interface ToggleProps {
  scalePosition: number
  isVertical: boolean
}

import Toggle from '../../../View/components/toggle/Toggle'
import Thumb from '../../../View/components/thumb/Thumb'

interface IToggle {
  main: Toggle
  thumb: Thumb | null
}

interface DomNode {
  toggle: HTMLElement
  handle: HTMLElement
}

export { ToggleProps, IToggle, DomNode }
