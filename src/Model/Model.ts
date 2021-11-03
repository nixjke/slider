import { Observer, ObserverEvents } from '../Observer/Observer'
import { IOptions, IRange } from '../utils/interface'

class Model extends Observer {
  private options: IOptions

  constructor(options: IOptions) {
    super()
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max')
    }

    this.options = options
  }

  public getRange(): IRange {
    return this.options.range
  }

  public getStart(): number {
    return this.options.start
  }

  public getCurrentValue(): number {
    return this.options.currentValue
  }

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg)
  }
}

export default Model
