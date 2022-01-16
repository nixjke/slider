const thubmTemplate = require('./thumb.hbs')

class Thumb {
  private domParent: HTMLElement

  constructor(domParent: HTMLElement) {
    this.domParent = domParent
    this.init()
  }

  private init() {
    const toggleHtml = this.domParent.querySelector('.toggle') as HTMLElement
    toggleHtml.insertAdjacentHTML('afterbegin', thubmTemplate())
  }

  getHtml() {
    return this.domParent.querySelector('.thumb')
  }
}

export default Thumb
