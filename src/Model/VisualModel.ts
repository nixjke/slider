import Observer from '../Observer/Observer'

class VisualModel extends Observer {
  constructor(public state: any = {}) {
    super()
  }

  public setState(state: {} = {}) {
    Object.assign(this.state, state)
    this.notify('newVisualModel', this.state)
  }
}

export default VisualModel
