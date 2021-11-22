interface Observer {
  update: Function
}

export default class Observable {
  observer: Observer[]

  constructor() {
    this.observer = []
  }

  on(observer: Observer) {
    this.observer.push(observer)
  }

  notify(data: any) {
    this.observer.forEach((observer: Observer) => observer.update(data))
  }
}
