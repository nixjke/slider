import Observer from '../Observer/Observer'
import IModelState from '../utils/IModel'
import './components/bar/bar.scss'
import './components/toggle/toggle.scss'

const barTemplate = require('./components/bar/bar.hbs')
const toggleTemplate = require('./components/toggle/toggle.hbs')

class View extends Observer {
  private state: IModelState
  private anchor: HTMLElement

  constructor(state: IModelState, anchor: HTMLElement) {
    super()
    this.state = state
    this.anchor = anchor
    this.init()
  }

  init() {
    this.anchor.insertAdjacentHTML('afterbegin', barTemplate())
    this.anchor.insertAdjacentHTML('afterbegin', toggleTemplate())

    const maxValue = 10
    const minValue = 5
    const step = 2

    var slider = this.anchor

    var bar = slider.querySelector('.bar')
    var scale = bar.querySelector('.scale')

    var toggle = slider.querySelector('.toggle')
    var handle = toggle.querySelector('.toggle__handle')

    function updateDisplay(event: MouseEvent) {
      // ПОЛУЧАЕМ ЗНАЧЕНИЯ
      var sliderWidth = bar.getBoundingClientRect().width // длина слайдера
      var windowXSliderStart = bar.getBoundingClientRect().x // координата X начала слайдера относительно окна пользователя
      var windowX = event.pageX // координата X из места клика относительно окна пользователя

      // ВЫЧИСЛЯЕМ КУДА КЛИКНУЛ
      var sliderX = windowX - windowXSliderStart // координата X из места клика относительно длины слайдера
      var procent = sliderX / sliderWidth // sliderX переводится в проценты для transform: scale

      // ВЫЧИСЛЯЕМ currentValue относительно position
      var currentValue = step * Math.round((procent * (maxValue - minValue)) / step) + minValue

      if (procent >= 0 && procent <= 1) {
        // УСТАНАВЛИВАЕМ ДЛИНУ для scale
        scale.setAttribute('style', `transform: scale(${procent}, 1);`)

        // Переносим toggle в место клика
        toggle.setAttribute('style', `transform: translateX(${sliderX}px);`)

        // Передаем currentValue в thumb
        thumb.innerHTML = `${currentValue}`
      }
    }

    slider.addEventListener('click', updateDisplay);
  }
}

export default View
