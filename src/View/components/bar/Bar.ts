const barTemplate = require('./bar.hbs')

class Bar {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    this.anchor.insertAdjacentHTML('afterbegin', barTemplate())
  }

  getHtml() {
    return this.anchor.querySelector('.bar')
  }
}

export default Bar
