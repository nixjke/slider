import { Observer, ObserverEvents } from '../Observer/Observer'
import { IRange } from '../utils/interface'

class View extends Observer {
  private start: number
  private range: IRange
  private currentValue: number
  private anchor: HTMLElement

  constructor(anchor: HTMLElement, start: number, range: IRange, currentValue: number) {
    super()
    this.anchor = anchor
    this.start = start
    this.range = range
    this.currentValue = currentValue
  }

  render() {
    const startHTML = `
    <div class="range-slider">
      <div class="range-slider__track"></div>
      <div class="range-slider__handle range-slider__handle--one">
        <div class="range-slider__tooltip"></div>
      </div>
      <div class="range-slider__scale"></div>
    </div>
    `

    this.anchor.insertAdjacentHTML('beforeend', startHTML)
  }
}

export default View
