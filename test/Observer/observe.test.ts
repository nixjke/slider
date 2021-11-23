import Observer from '../../src/Observer/Observer'

describe('Obsever', () => {
  const observer = new Observer()
  const data = { text: 'data' }

  test('should add subscriber to observers and send them data', () => {
    const subscriber = jest.fn()

    observer.on(subscriber)
    observer.notify(data)

    expect(subscriber).toHaveBeenCalledWith(data)
  })
})
