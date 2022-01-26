import sliderClassNames from '../../../utils/sliderClassNames'
import Observer from '../../../Observer/Observer'
import IThumbProps from '../../../utils/interfaces/view/components/thumb/IThumbProps'
import IDomNode from '../../../utils/interfaces/view/components/thumb/IDomNode'

const thumbTemplate = require('./thumb.hbs')

class Thumb extends Observer {
  private props: IThumbProps

  private domNode!: IDomNode

  constructor(props: IThumbProps) {
    super()
    this.props = props
  }

  getHtml (): ChildNode  {
    const { value } = this.props
    const templateOptions = { sliderClassNames, value }
    const thumb = document.createElement('div')
    thumb.innerHTML = thumbTemplate(templateOptions)
    return thumb.firstChild as HTMLElement
  }

  getDomNode() {
   return this.domNode
  }

  setDomNode (domNode: IDomNode)  {
    this.domNode = domNode
  }

  updateProps  (props: IThumbProps)  {
    this.props = props
    this.redraw()
  }

  private redraw ()  {
    const { value } = this.props
    this.domNode.thumb.textContent = `${value}`
  }
}

export default Thumb
