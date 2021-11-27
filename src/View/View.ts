import Observer from '../Observer/Observer'

class View extends Observer {
  static updateModelOptions: any
  constructor(public anchor: HTMLElement) {
    super()
  }
}

export default View
