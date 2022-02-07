import SliderClassNames from '../ISliderClassNames'

interface DomNode {
  ruler: HTMLElement
}

interface RulerProps {
  step: number
  range: { min: number; max: number }
  withRuler: boolean
  isVertical: boolean
}

type RulerItem = {
  value: number
  style: string
  class: string
}

interface RulerTemplateOptions {
  sliderClassNames: SliderClassNames
  items: RulerItem[]
}

export { DomNode, RulerProps, RulerItem, RulerTemplateOptions }
