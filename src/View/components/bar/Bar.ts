const barTemplate = require('../bar/bar.hbs')

class Bar {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    this.anchor.insertAdjacentHTML('afterbegin', barTemplate())
  }
}

export default Bar
