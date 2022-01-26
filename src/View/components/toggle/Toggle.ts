import sliderClassNames from '../../../utils/sliderClassNames'
import IToggleProps from '../../../utils/interfaces/view/components/toggle/IToggleProps'
import IDomNode from '../../../utils/interfaces/view/components/toggle/IDomNode'

const toggleTemplate = require('./toggle.hbs')

class Toggle {
  private props: IToggleProps

  private domNode!: IDomNode

  constructor(props: IToggleProps) {
    this.props = props
  }

  getHtml(): ChildNode {
    const templateOptions = { sliderClassNames }
    const toggle = document.createElement('div')
    toggle.innerHTML = toggleTemplate(templateOptions)
    const viewToggle = toggle.querySelector(`.${sliderClassNames.toggle}`) as HTMLElement
    viewToggle.setAttribute('style', this.getTransformStyle())
    return toggle.firstChild as HTMLElement
  }

  getDomNode() {
    return this.domNode
  }

  setDomNode(domNode: IDomNode) {
    this.domNode = domNode
  }

  updateProps(props: IToggleProps) {
    this.props = props
    this.redraw()
  }

  private redraw() {
    return this.domNode.toggle.setAttribute('style', this.getTransformStyle())
  }

  private getTransformStyle(): string {
    const { isVertical } = this.props
    const togglePosition = this.getPosition()

    if (isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`
    }

    return `transform: translate(${togglePosition}%, 0px);`
  }

  private getPosition(): number {
    const { scalePosition } = this.props
    const togglePosition = scalePosition * 1000
    return togglePosition
  }
}

export default Toggle
