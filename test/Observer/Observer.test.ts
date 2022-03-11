import Observer from '../../src/slider/Observer/Observer'
import ObserverEvents from '../../src/slider/Observer/ObserverEvents'

let observer: Observer

beforeEach(() => {
  observer = new Observer()
})

describe('Observer', () => {
  it('Subscribe', () => {
    observer = new Observer()
    const testSubCallBack = jest.fn()
    observer.on(ObserverEvents.modelStateUpdate, testSubCallBack)
    expect(testSubCallBack.mock.calls.length).toBe(0)
  })

  it('Notify', () => {
    observer = new Observer()
    const testData = { text: 'hello from test' }
    const testSubCallBack = jest.fn()
    observer.on(ObserverEvents.modelStateUpdate, testSubCallBack)
    observer.notify(ObserverEvents.modelStateUpdate, testData)
    expect(testSubCallBack.mock.calls.length).toBe(1)
  })
})
