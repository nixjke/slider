const rulerTemplate = require('./ruler.hbs')

class Ruler {
  private domParent: HTMLElement

  constructor(domParent: HTMLElement) {
    this.domParent = domParent
    this.init()
  }

  private init() {
    this.domParent.insertAdjacentHTML('afterbegin', rulerTemplate())
  }

  getRulerHtml() {
    return this.domParent.querySelector('.ruler')
  }
}

export default Ruler
