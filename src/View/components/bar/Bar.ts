import sliderClassNames from '../../../utils/sliderClassNames'
import IBarProps from '../../../utils/interfaces/view/components/bar/IBarProps'
import IDomNode from '../../../utils/interfaces/view/components/bar/IDomNode'

const barTemplate = require('./bar.hbs')

class Bar {
  private props: IBarProps

  private domNode!: IDomNode

  constructor(props: IBarProps) {
    this.props = props
  }

  getHtml(): ChildNode {
    const templateOptions = { sliderClassNames }
    const scale = document.createElement('div')
    scale.innerHTML = barTemplate(templateOptions)
    const scaleView = scale.querySelector(`.${sliderClassNames.scale}`) as HTMLElement
    scaleView.setAttribute('style', this.getTransformStyle())
    return scale.firstChild as HTMLElement
  }

  getPosition(currentValue: number): number {
    const { range } = this.props
    const scalePosition = (+currentValue - range.min) / (range.max - range.min)
    return scalePosition
  }

  getDomNode() {
    return this.domNode
  }

  setDomNode(domNode: IDomNode) {
    this.domNode = domNode
  }

  updateProps(props: IBarProps) {
    this.props = props
    this.redraw()
  }

  private redraw() {
    this.domNode.scale.setAttribute('style', this.getTransformStyle())
  }

  private getTransformStyle(): string {
    const { values, isVertical } = this.props
    const isRange = values.hasOwnProperty('max')

    if (isRange) {
      const scalePositions = Object.entries(values).map(([, value]) => this.getPosition(value!))
      const translateScale = scalePositions[0] * 100
      const totalPosition = scalePositions[1] - translateScale * 0.01

      if (isVertical) {
        return `transform: translate(0px, ${translateScale}%) scale(1, ${totalPosition});`
      }

      return `transform: translate(${translateScale}%, 0px) scale(${totalPosition}, 1);`
    }

    const totalPosition = this.getPosition(values.start)

    if (isVertical) {
      return `transform: scale(1, ${totalPosition});`
    }

    return `transform: scale(${totalPosition}, 1);`
  }
}

export default Bar
