import { IRange } from '../utils/interface'

class View {
  private start: number
  private range: IRange

  constructor(start: number, range: IRange) {
    this.start = start
    this.range = range
  }

  render() {
    const startHTML = document.createElement('p')
    startHTML.textContent = `начальное значение: ${this.start}`
    document.body.appendChild(startHTML)
    const p = document.createElement('p')
    p.textContent = `рейндж: ${this.range.min} --- ${this.range.max}`
    document.body.appendChild(p)
  }
}

export default View
