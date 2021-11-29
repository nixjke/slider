import Observer from '../../src/Observer/Observer'

let observer: Observer

beforeEach(() => {
  observer = new Observer()
})

describe('Observer', () => {
  it('подписывает', () => {
    observer = new Observer()
    const testSubCallBack = jest.fn()
    observer.subscribe(testSubCallBack)
    expect(testSubCallBack.mock.calls.length).toBe(0)
  })

  it('оповещает', () => {
    observer = new Observer()
    const testData = { text: 'hello from test' }
    const testSubCallBack = jest.fn()
    observer.subscribe(testSubCallBack)
    observer.notify(testData)
    expect(testSubCallBack.mock.calls.length).toBe(1)
  })
})
