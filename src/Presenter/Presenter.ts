import Model from '../Model/Model'
import View from '../View/View'

class Presenter {
  private model = new Model()
  private view = new View()

  constructor() {
    this.bindEvents()

    this.model.setState({
      min: 1,
      max: 100,
      values: [31],
      step: 1,
    })
    this.view.renderTemplate({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'double',
    })
  }

  private bindEvents() {
    this.view.on('finishRenderTemplate', (wrapper: HTMLElement) => this.arrangeHandlers(wrapper))
    this.model.on('pxValueDone', (obj: {}) => this.view.renderValues(obj))
  }

  // Начальная расстановка бегунков
  private arrangeHandlers(wrapper: HTMLElement) {
    const handlers = wrapper.querySelectorAll('.slider__handler')
    const edge = wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth

    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      })
    }

    this.listenUserEvents(wrapper, edge)
  }

  private listenUserEvents(wrapper: HTMLElement, edge: number) {
    wrapper.addEventListener('mousedown', e => {
      e.preventDefault()
      if ((e.target as HTMLElement).className !== 'slider__handler') return

      const tempTarget = e.target
      const shiftX = e.offsetX

      const mousemove = onMouseMove.bind(this)
      const mouseup = onMouseUp

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)

      function onMouseMove(this: Presenter, e: MouseEvent) {
        const left = e.clientX - shiftX - wrapper.offsetLeft

        this.model.setState({ left, tempTarget })
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
    })
  }
}
export default Presenter
