import Observer from '../Observer/Observer'
import { IOptions } from '../utils/interface'

class Model extends Observer {
  private options: IOptions

  constructor(options: IOptions) {
    super()
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max')
    }

    this.options = options
  }

  getRange = () => this.options.range

  getStart = () => this.options.start

  getCurrentValue = () => this.options.currentValue

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg)
  }
}

export default Model
