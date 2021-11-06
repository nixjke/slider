import { Observer } from '../Observer/Observer'

class View extends Observer {
  private anchor: HTMLElement

  constructor(anchor: HTMLElement) {
    super()
    this.anchor = anchor
  }

  render() {
    const template = `
    <div class="range-slider">
      <div class="range-slider__track"></div>
      <div class="range-slider__handle range-slider__handle--one">
        <div class="range-slider__tooltip"></div>
      </div>
      <div class="range-slider__scale"></div>
    </div>
    `

    this.anchor.insertAdjacentHTML('beforeend', template)
  }
}

export default View
