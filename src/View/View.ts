import Observer from '../Observer/Observer'

class View extends Observer {
  constructor() {
    super()
  }

  public test() {
    console.log('test')
  }
}

export default View
