const barTemplate = require('./bar.hbs')

class Bar {
  private domParent: HTMLElement

  constructor(domParent: HTMLElement) {
    this.domParent = domParent
    this.init()
  }

  private init() {
    this.domParent.insertAdjacentHTML('afterbegin', barTemplate())
  }

  getHtml() {
    return this.domParent.querySelector('.bar')
  }
}

export default Bar
