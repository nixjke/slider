const thubmTemplate = require('./thumb.hbs')

class Thumb {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    const toggleHtml = this.anchor.querySelector('.toggle') as HTMLElement
    toggleHtml.insertAdjacentHTML('afterbegin', thubmTemplate())
  }

  getThumbHtml() {
    return this.anchor.querySelector('.thumb')
  }
}

export default Thumb
