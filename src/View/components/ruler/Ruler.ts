const rulerTemplate = require('./ruler.hbs')

class Ruler {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    this.anchor.insertAdjacentHTML('afterbegin', rulerTemplate())
  }

  getRulerHtml() {
    return this.anchor.querySelector('.ruler')
  }
}

export default Ruler
