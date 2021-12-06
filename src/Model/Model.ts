import Observer from '../Observer/Observer'
import IModel from '../utils/IModel'

class Model extends Observer {
  private state: IModel
  private anchor

  constructor(state: IModel) {
    super()
    this.state = this.getProcessedData(state)
    this.sub()

    this.anchor = document.getElementById('anchor')?.addEventListener('click', () => this.notify(this.event))
  }

  sub() {
    this.subscribe(this.event)
  }
  not() {
    this.notify(this.event)
  }

  event() {
    console.log('Test observer')
  }

  private getProcessedData(state: IModel): IModel {
    const processedData = { ...state }
    const { values, range, step } = state
    const isValuesNan = Number.isNaN(values.start) || Number.isNaN(values.end)
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max)
    const isStepNan = Number.isNaN(step)
    const isRange = values.hasOwnProperty('max')

    return processedData
  }
}

export default Model
