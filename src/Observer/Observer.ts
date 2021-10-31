type Subscriber = (...args: any[]) => any
interface ISubscribers {
  [key: string]: Array<Subscriber>
}

enum ObserverEvents {
  modelOptionsUpdate,
  rulerHide,
  thumbHide,
  testSub,
}

class Observer {
  private subscribers: ISubscribers

  constructor() {
    this.subscribers = {}
  }

  subscribe(subName: ObserverEvents, callback: Subscriber) {
    this.subscribers[subName] = [callback]
  }

  notify<T>(subName: ObserverEvents, data: T) {
    if (this.subscribers[subName]) {
      this.subscribers[subName].forEach((callback: Subscriber) => callback(data))
    }
  }
}

export { Observer, ObserverEvents }
