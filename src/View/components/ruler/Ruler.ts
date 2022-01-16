import sliderClassNames from '../../../utils/sliderClassNames'
import ObserverEvents from '../../../Observer/ObserverEvents'
import Observer from '../../../Observer/Observer'
import IRulerProps from '../../../utils/interfaces/view/components/ruler/IRulerProps'
import IDomNode from '../../../utils/interfaces/view/components/ruler/IDomNode'
import IRulerTemplateOptions from '../../../utils/interfaces/view/components/ruler/IRulerTemplate'
import RulerItem from '../../../utils/interfaces/view/components/ruler/RulerItem'
const rulerTemplate = require('./ruler.hbs')

class Ruler extends Observer {
  private props: IRulerProps

  private domNode!: IDomNode

  constructor(props: IRulerProps) {
    super()
    this.props = props
  }

  getProps = () => this.props

  getHtml = (): ChildNode => {
    const templateOptions: IRulerTemplateOptions = {
      sliderClassNames,
      items: this.getRulerItems(),
    }
    const ruler = document.createElement('div')
    ruler.innerHTML = rulerTemplate(templateOptions)
    return ruler.firstChild as HTMLElement
  }

  getDomNode = () => this.domNode

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode
  }

  updateProps = (props: IRulerProps) => {
    this.props = props
    const { ruler } = this.props
    if (ruler) {
      this.redraw()
    } else {
      this.notify(ObserverEvents.rulerHide, '')
    }
  }

  destroyDom = () => {
    const { ruler } = this.domNode
    const parent = ruler.parentElement as HTMLElement
    parent.removeChild(ruler)
  }

  getRulerValues = (): number[] => {
    const { range, step } = this.props
    const midQuantity = Math.ceil((range.end - range.start) / step)
    const viewStep = Math.ceil(midQuantity / 5) * step
    const midArr = []
    let value = range.start

    for (let i = 0; value < range.end; i += 1) {
      value += viewStep
      if (value < range.end) midArr.push(Number(value.toLocaleString('en', { useGrouping: false })))
    }

    return [range.start, ...midArr, range.end]
  }

  private redraw = () => {
    this.domNode.ruler.textContent = ''
    Array.from(this.getHtml().childNodes).forEach(item => {
      this.domNode.ruler.appendChild(item)
    })
  }

  private getRulerItems = (): RulerItem[] => {
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

  private getTransformStyleByValue = (value: number): string => {
    const { isVertical } = this.props
    const position = this.getPositionByValue(value)

    if (isVertical) {
      return `transform: translate(0px, ${position}%);`
    }

    return `transform: translate(${position}%, 0px);`
  }

  private getPositionByValue(value: number): number {
    const { range } = this.props
    return ((+value - range.start) / (range.end - range.start)) * 1000
  }
}

export default Ruler
