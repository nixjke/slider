import { IOptions, IModel } from '../utils/interface'

class Model implements IModel {
  private options: IOptions

  constructor(options: IOptions) {
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max')
    }

    this.options = options
  }

  public getRange = () => this.options.range

  public getStart = () => this.options.start

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg)
  }
}

export default Model
