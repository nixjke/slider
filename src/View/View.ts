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
    const startHTML =`
    <div>
      <span>Начальное значение: ${this.start}</span><br>
      <span>Рейндж: ${this.range.min} --- ${this.range.max}</span><br>
      <span>Текущее значение: ${this.currentValue}</span>
    </div>`

    this.anchor.insertAdjacentHTML('beforeend', startHTML)
  }
}

export default View
