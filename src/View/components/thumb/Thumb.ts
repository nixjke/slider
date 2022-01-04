const thubmTemplate = require('./thumb.hbs')

class Thumb {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    this.anchor = anchor
    this.init()
  }

  private init() {
    // this.anchor.insertAdjacentHTML('afterbegin', thubmTemplate())
    const toggleHtml = this.anchor.querySelector('.toggle') as HTMLElement
    console.log(toggleHtml)
  }

  getThumbHtml() {
    return this.anchor.querySelector('.thumb')
  }
}

export default Thumb
