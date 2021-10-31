// Model
interface IModel {
  getRange(): IRange
  getStart(): number
  getCurrentValue(): number
}

// Observer
interface IObserver {
  addObserver(observer: Function): void
  removeObserver(observer: Function): void
  getList(): Function[]
  getCount(): Number
  notify(data?: any): void
}

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

export { IRange, IOptions, IModel, IObserver }
