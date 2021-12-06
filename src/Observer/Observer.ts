type Subscriber = (...args: any[]) => any
type ISubscribers = Array<Subscriber>

class Observer {
  private subscribers: ISubscribers

  constructor() {
    this.subscribers = []
  }

  public on(callback: Subscriber) {
    this.subscribers.push(callback)
  }

  public notify<T>(data: T) {
    this.subscribers.forEach((callback: Subscriber) => callback(data))
  }
}

export default Observer
