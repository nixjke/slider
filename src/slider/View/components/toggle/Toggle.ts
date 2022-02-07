import sliderClassNames from '../../../utils/sliderClassNames'
import { DomNode, ToggleProps } from '../../../utils/interfaces/Components/IToggle'

const toggleTemplate = require('./toggle.hbs')

class Toggle {
  private props: ToggleProps

  private domNode!: DomNode

  constructor(props: ToggleProps) {
    this.props = props
  }

  getHtml = (): ChildNode => {
    const templateOptions = { sliderClassNames }
    const toggle = document.createElement('div')
    toggle.innerHTML = toggleTemplate(templateOptions)
    const viewToggle = toggle.querySelector(`.${sliderClassNames.toggle}`) as HTMLElement
    viewToggle.setAttribute('style', this.getTransformStyle())
    return toggle.firstChild as HTMLElement
  }

  getDomNode = () => this.domNode

  setDomNode = (domNode: DomNode) => {
    this.domNode = domNode
  }

  updateProps = (props: ToggleProps) => {
    this.props = props
    this.redraw()
  }

  private redraw = () => {
    this.domNode.toggle.setAttribute('style', this.getTransformStyle())
  }

  private getTransformStyle = (): string => {
    const { isVertical } = this.props
    const togglePosition = this.getPosition()

    if (isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`
    }

    return `transform: translate(${togglePosition}%, 0px);`
  }

  private getPosition = (): number => {
    const { scalePosition } = this.props
    const togglePosition = scalePosition * 1000
    return togglePosition
  }
}

export default Toggle
