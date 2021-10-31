import { IObserver } from '../utils/interface'

class Observer implements IObserver {
  private observerList: Function[] = []

  getList = () => this.observerList

  getCount = () => this.getList().length

  addObserver = (observer: Function) => {
    this.getList().push(observer)
  }

  removeObserver = (observer: Function) => {
    const index = this.getList().indexOf(observer)

    if (index > -1) {
      this.getList().splice(index, 1)
    }
  }

  notify = (data?: any) => {
    if (this.getCount() > 0) {
      this.getList().forEach((observer: Function) => {
        observer(data)
      })
    }
  }
}

export default Observer
