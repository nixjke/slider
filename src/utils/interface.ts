// default state
interface IRange {
  min: number
  max: number
}

interface IOptions {
  start: number
  currentValue: number
  range: IRange
}

export { IRange, IOptions }