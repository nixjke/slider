import { Observer } from '../Observer/Observer'
import constants from '../../utils/constants'

class View extends Observer {
  private wrapper!: HTMLElement
  private state: any = {}

  constructor(public slider: HTMLElement = document.body) {
    super()
  }

  public update(state: any) {
    if (state.direction && state.skin && state.type) {
      Object.assign(this.state, arguments[0])
      this._renderTemplate(state)
    } else {
      this._renderValues(state)
    }
  }

  private _recreateTemplate() {
    if (this.wrapper !== undefined) {
      ;(this.wrapper.parentElement as HTMLElement).removeChild(this.wrapper)
    }
  }

  private _renderTemplate({ direction, skin, bar, tip, type, scale }: any) {
    this._recreateTemplate()

    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}">
          ${bar ? `<div class="slider__bar"></div>` : ''}
          <div class="slider__handler">
            ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ''}
          </div>
          ${
            type === 'double'
              ? `<div class="slider__handler">
            ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ''}
          </div>`
              : ''
          }
        </div>
      </div>
    `

    this.slider.insertAdjacentHTML('afterbegin', sliderTemplate)
    this.wrapper = this.slider.querySelector('.wrapper-slider') as HTMLElement
    const handlers = this.wrapper.querySelectorAll('.slider__handler')

    let edge
    if (direction === constants.DIRECTION_VERTICAL) {
      edge = this.wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight
    } else {
      edge = this.wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth
    }

    if (scale.status) {
      const dashesHTML = `<div class="slider__dashes"></div>`
      this.wrapper.insertAdjacentHTML('afterbegin', dashesHTML)

      const dashesWrapper = this.wrapper.querySelector('.slider__dashes') as HTMLElement
      const dashHTML = `<div class="slider__dash"></div>`
      for (let i = 0; i < this.state.scale.count; i++) {
        dashesWrapper.insertAdjacentHTML('beforeend', dashHTML)
      }

      dashesWrapper.style.width = edge + 'px'
      dashesWrapper.style.left = `${(handlers[0] as HTMLElement).offsetWidth / 2}px`
    }

    this._listenUserEvents()
    this.emit('finishRenderTemplate', { handlers, edge })
  }

  private _renderValues({ tempPxValue, tempPxValues, tempValue, tempTarget }: any) {
    if (!tempTarget) return

    let tip
    if (this.state.tip === true) {
      tip = tempTarget.querySelector('.slider__tip') as HTMLElement
      tip.setAttribute('data-value', `${tempValue}`)
    }
    let bar
    if (this.state.bar === true) {
      bar = tempTarget.parentElement.querySelector('.slider__bar')

      if (this.state.direction === constants.DIRECTION_VERTICAL) {
        if (this.state.type === constants.TYPE_DOUBLE) {
          bar.style.bottom = tempPxValues[0] + 'px'
          bar.style.height = tempPxValues[1] - tempPxValues[0] + 10 + 'px'
        } else {
          bar.style.height = tempPxValue + 10 + 'px'
        }
      } else {
        if (this.state.type === constants.TYPE_DOUBLE) {
          bar.style.left = tempPxValues[0] + 'px'
          bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + 'px'
        } else {
          bar.style.width = tempPxValue + 10 + 'px'
        }
      }
    }

    if (this.state.direction === constants.DIRECTION_VERTICAL) {
      tempTarget.style.bottom = tempPxValue + 'px'
    } else {
      tempTarget.style.left = tempPxValue + 'px'
    }
  }

  private _listenUserEvents() {
    this.wrapper.addEventListener('mousedown', e => {
      e.preventDefault()
      if ((e.target as HTMLElement).className !== 'slider__handler') return

      const tempTarget = e.target as HTMLElement
      const shiftX = e.offsetX
      const shiftY = tempTarget.offsetHeight - e.offsetY

      const onmousemove = _onMouseMove.bind(this)
      const onmouseup = _onMouseUp

      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)

      function _onMouseMove(this: View, e: MouseEvent) {
        let left
        if (this.state.direction === constants.DIRECTION_VERTICAL) {
          left = this.wrapper.offsetHeight - e.clientY - shiftY + this.wrapper.getBoundingClientRect().top
        } else {
          left = e.clientX - shiftX - this.wrapper.offsetLeft
        }

        this.emit('onUserMove', { left, tempTarget })
      }

      function _onMouseUp() {
        document.removeEventListener('mousemove', onmousemove)
        document.removeEventListener('mouseup', onmouseup)
      }
    })
  }
}

export { View }
