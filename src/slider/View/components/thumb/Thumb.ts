import sliderClassNames from '../../../utils/sliderClassNames'
import Observer from '../../../Observer/Observer'
import { DomNode, ThumbProps } from '../../../utils/interfaces/Components/IThumb'

const thumbTemplate = require('./thumb.hbs')

class Thumb extends Observer {
  private props: ThumbProps

  private domNode!: DomNode

  constructor(props: ThumbProps) {
    super()
    this.props = props
  }

  getHtml(): ChildNode {
    const { value } = this.props
    const templateOptions = { sliderClassNames, value }
    const thumb = document.createElement('div')
    thumb.innerHTML = thumbTemplate(templateOptions)
    return thumb.firstChild as HTMLElement
  }

  getDomNode() {
    return this.domNode
  }

  setDomNode(domNode: DomNode) {
    this.domNode = domNode
  }

  updateProps(props: ThumbProps) {
    this.props = props
    this.redraw()
  }

  private redraw() {
    const { value } = this.props
    this.domNode.thumb.textContent = `${value}`
  }
}

export default Thumb
