const toggleTemplate = require('./toggle.hbs')

class Toggle {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    this.anchor.insertAdjacentHTML('afterbegin', toggleTemplate())
  }

  getToggleHtml() {
    return this.anchor.querySelector('.toggle')
  }
}

export default Toggle
