import sliderClassNames from '../../../utils/sliderClassNames'
import ObserverEvents from '../../../Observer/ObserverEvents'
import Observer from '../../../Observer/Observer'
import { DomNode, RulerItem, RulerProps, RulerTemplateOptions } from '../../../utils/interfaces/Components/IRuler'

const rulerTemplate = require('./ruler.hbs')

class Ruler extends Observer {
  private props: RulerProps
  private domNode!: DomNode

  constructor(props: RulerProps) {
    super()
    this.props = props
  }

  getProps() {
    return this.props
  }

  getHtml(): ChildNode {
    const templateOptions: RulerTemplateOptions = {
      sliderClassNames,
      items: this.getRulerItems(),
    }
    const ruler = document.createElement('div')
    ruler.innerHTML = rulerTemplate(templateOptions)
    return ruler.firstChild as HTMLElement
  }

  getDomNode() {
    return this.domNode
  }

  setDomNode(domNode: DomNode) {
    this.domNode = domNode
  }

  updateProps(props: RulerProps) {
    this.props = props
    const { withRuler } = this.props
    if (withRuler) {
      this.redraw()
    } else {
      this.notify(ObserverEvents.rulerHide, '')
    }
  }

  destroyDom() {
    const { ruler } = this.domNode
    const parent = ruler.parentElement as HTMLElement
    parent.removeChild(ruler)
  }

  getRulerValues(): number[] {
    const { range, step } = this.props
    const midQuantity = Math.ceil((range.max - range.min) / step)
    const viewStep = Math.ceil(midQuantity / 5) * step
    const midArr = []
    let value = range.min

    for (let i = 0; value < range.max; i += 1) {
      value += viewStep
      if (value < range.max) midArr.push(Number(value.toLocaleString('en', { useGrouping: false })))
    }

    return [range.min, ...midArr, range.max]
  }

  private redraw() {
    this.domNode.ruler.textContent = ''
    Array.from(this.getHtml().childNodes).forEach(item => {
      this.domNode.ruler.appendChild(item)
    })
  }

  private getRulerItems(): RulerItem[] {
    const rulerValues = this.getRulerValues()
    const { isVertical } = this.props
    return rulerValues.map(value => {
      const rulerItem = {
        value,
        style: this.getTransformStyleByValue(value),
        class: isVertical
          ? `${sliderClassNames.rulerItem} ${sliderClassNames.rulerItemVertical}`
          : `${sliderClassNames.rulerItem}`,
      }
      return rulerItem
    })
  }

  private getTransformStyleByValue(value: number): string {
    const { isVertical } = this.props
    const position = this.getPositionByValue(value)

    if (isVertical) {
      return `transform: translate(0px, ${position}%);`
    }

    return `transform: translate(${position}%, 0px);`
  }

  private getPositionByValue(value: number): number {
    const { range } = this.props
    return ((+value - range.min) / (range.max - range.min)) * 1000
  }
}

export default Ruler
