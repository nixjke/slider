import { Model } from '../Model/Model'
import { View } from '../View/View'
import { VisualModel } from '../Model/VisualModel'

class Controller {
  private model = new Model()
  private visualModel = new VisualModel()
  private view: View = new View()

  constructor() {
    this._bindEvents()

    this.model.setState({
      min: 1,
      max: 100,
      values: [30, 60],
      step: 5,
    })
    this.visualModel.setState({
      direction: 'vertical',
      skin: 'yellow',
      bar: true,
      tip: true,
      type: 'double',
    })
  }

  private _bindEvents() {
    this.visualModel.on('newVisualModel', (state: {}) => this.view.update(state))
    this.view.on('finishRenderTemplate', (wrapper: HTMLElement) => this._arrangeHandlers(wrapper))
    this.model.on('pxValueDone', (obj: {}) => this.view.update(obj))
  }

  // Начальная расстановке бегунков
  private _arrangeHandlers(wrapper: HTMLElement) {
    const handlers = wrapper.querySelectorAll('.slider__handler')
    let edge

    if (this.visualModel.state.direction === 'vertical') {
      edge = wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight
    } else {
      edge = wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth
    }

    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        template: handlers[i],
        templateValue: (this.model.state.values as number[])[i],
      })
    }

    this._listenUserEvents(wrapper)
  }

  private _listenUserEvents(wrapper: HTMLElement) {
    wrapper.addEventListener('mousedown', e => {
      e.preventDefault()
      if ((e.target as HTMLElement).className !== 'slider__handler') return

      const tempTarget = e.target as HTMLElement
      const shiftX = e.offsetX
      const shiftY = (e.target as HTMLElement).offsetHeight - e.offsetY

      const mousemove = _onMouseMove.bind(this)
      const mouseup = _onMouseUp

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)

      function _onMouseMove(this: Controller, e: MouseEvent) {
        let left
        if (this.visualModel.state.direction === 'vertical') {
          left = wrapper.offsetHeight - e.clientY - shiftY + wrapper.getBoundingClientRect().top
        } else {
          left = e.clientX - shiftX - wrapper.offsetLeft
        }

        this.model.setState({ left, tempTarget })
      }

      function _onMouseUp() {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
    })
  }
}

export { Controller }
