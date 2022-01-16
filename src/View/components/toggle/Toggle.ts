const toggleTemplate = require('./toggle.hbs')

class Toggle {
  private domParent: HTMLElement

  constructor(domParent: HTMLElement) {
    this.domParent = domParent
    this.init()
  }

  private init() {
    this.domParent.insertAdjacentHTML('afterbegin', toggleTemplate())
  }

  getHtml() {
    return this.domParent.querySelector('.toggle')
  }
}

export default Toggle
