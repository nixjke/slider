import { VisualState } from '../../utils/interface'
import View from '../View'
import { SingleFactory, IntervalFactory } from '../Factories/Factories'
import { constants } from '../../utils/constants'

class AppConfigurator {
  public main({ type, direction }: VisualState, anchor: HTMLElement) {
    let factory

    if (type === constants.TYPE_SINGLE) {
      factory = new SingleFactory(direction)
    } else if (type === constants.TYPE_INTERVAL) {
      factory = new IntervalFactory(direction)
    } else {
      throw new Error(`Error! Unknown ${type} or ${direction}`)
    }

    return new View(factory, anchor)
  }
}

export default AppConfigurator
