class Observer {
  observer: any[]

  constructor() {
    this.observer = []
  }

  on(observer: any) {
    this.observer.push(observer)
  }

  notify(data: any) {
    this.observer.forEach(observer => observer(data))
  }
}

export default Observer
