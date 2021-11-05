import { Subscribers, EventCallback } from '../utils/interface'

class Observer {
  constructor(public subscribers: Subscribers = {}) {}

  public subscribe(eventName: string, func: EventCallback) {
    const event = this.subscribers[eventName]

    if (event) {
      event.push(func)
    } else {
      this.subscribers[eventName] = [func]
    }
  }

  public notify(eventName: string, data?: {}) {
    const event = this.subscribers[eventName]

    if (event) {
      event.forEach((func: EventCallback) => func(data))
    }
  }
}

export { Observer }
