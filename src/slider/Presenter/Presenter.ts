import Observer from '../Observer/Observer'

class Presenter extends Observer {
  private model
  private view
  private domParent: HTMLElement

  constructor() {
    super()
  }
}

export default Presenter
