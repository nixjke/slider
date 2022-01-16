import ObserverEvents from './ObserverEvents'

type Subscriber = (...args: any[]) => any
interface ISubscribers {
  [key: string]: Array<Subscriber>
}

class Observer {
  private subscribers: ISubscribers

  constructor() {
    this.subscribers = {}
  }

  subscribe = (subName: ObserverEvents, callback: Subscriber) => {
    this.subscribers[subName] = [callback]
  }

  notify = <T>(subName: ObserverEvents, data: T) => {
    if (this.subscribers[subName]) {
      this.subscribers[subName].forEach((callback: Subscriber) => callback(data))
    }
  }
}

export default Observer
