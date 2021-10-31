import { IRange } from '../utils/interface'

class View {
  private start: number
  private range: IRange
  private currentValue: number

  constructor(start: number, range: IRange, currentValue: number) {
    this.start = start
    this.range = range
    this.currentValue = currentValue
  }

  render() {
    console.log('View')
    const startHTML = document.createElement('p')
    startHTML.textContent = `начальное значение: ${this.start}`
    document.body.appendChild(startHTML)
    const p = document.createElement('p')
    p.textContent = `рейндж: ${this.range.min} --- ${this.range.max}`
    document.body.appendChild(p)
    const currentValueP = document.createElement('p')
    currentValueP.textContent = `Текущее значение: ${this.currentValue}`
    document.body.appendChild(currentValueP)
  }
}

export default View
