const barTemplate = require('../bar/bar.hbs')

class Bar {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
  }
}

export default Bar
