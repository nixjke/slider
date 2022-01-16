const toggleTemplate = require('./toggle.hbs')

class Toggle {
  private domNode!: HTMLElement

  constructor(domParent: HTMLElement) {
    this.domNode = domParent
    this.init()
  }

  private init() {
    this.domNode.insertAdjacentHTML('afterbegin', toggleTemplate())
  }

  getHtml() {
    return this.domNode.querySelector('.toggle')
  }

  getDomNode() {
    return this.domNode
  }
}

export default Toggle
