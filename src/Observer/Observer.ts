type EventCallback = (data?: any) => void

interface Events {
  [key: string]: EventCallback[]
}

class Observer {
  constructor(public events: Events = {}) {}

  public on(eventName: string, func: EventCallback) {
    const event = this.events[eventName]

    if (event) {
      event.push(func)
    } else {
      this.events[eventName] = [func]
    }
  }

  public notify(eventName: string, data?: {}) {
    const event = this.events[eventName]

    if (event) {
      event.forEach((func: EventCallback) => func(data))
    }
  }
}

export default Observer
