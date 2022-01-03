import Observer from '../Observer/Observer'
import ModelState from '../utils/IModel'

import Bar from './components/bar/Bar'
import Ruler from './components/ruler/Ruler'

import './components/bar/bar.scss'
import './components/toggle/toggle.scss'
import './components/thumb/thumb.scss'
import './components/ruler/ruler.scss'

const toggleTemplate = require('./components/toggle/toggle.hbs')
const thumbTempalte = require('./components/thumb/thumb.hbs')

class View extends Observer {
  private state: ModelState
  private anchor: HTMLElement

  constructor(state: ModelState, anchor: HTMLElement) {
    super()
    this.state = state
    this.anchor = anchor
    const newBar = new Bar(this.anchor)
    const newRuler = new Ruler(this.anchor)

    this.init()

    var slider = this.anchor
    var bar = slider.querySelector('.bar') as HTMLElement

    var scale = bar.querySelector('.scale') as HTMLElement

    var toggle = slider.querySelector('.toggle') as HTMLElement

    var thumb = toggle.querySelector('.thumb') as HTMLElement

    toggle.setAttribute('style', `transform: translateX(0px);`)
  }

  init() {
    this.anchor.insertAdjacentHTML('afterbegin', toggleTemplate())

    function getRulerItemPosition(item: number) {
      const posItem = ((item - minValue) / (maxValue - minValue)) * 1000
      return posItem
    }

    const maxValue = 100
    const minValue = 0
    const step = 1

    var slider = this.anchor

    var bar = slider.querySelector('.bar') as HTMLElement

    var scale = bar.querySelector('.scale') as HTMLElement

    var toggle = slider.querySelector('.toggle') as HTMLElement
    toggle.insertAdjacentHTML('afterbegin', thumbTempalte())

    var thumb = toggle.querySelector('.thumb') as HTMLElement

    var ruler = slider.querySelector('.ruler') as HTMLElement

    var handle = toggle.querySelector('.toggle__handle') as HTMLElement

    function updateDisplay(event: MouseEvent) {
      // ПОЛУЧАЕМ ЗНАЧЕНИЯ
      var sliderWidth = bar.getBoundingClientRect().width // длина слайдера
      var windowXSliderStart = bar.getBoundingClientRect().x // координата X начала слайдера относительно окна пользователя
      var windowX = event.pageX // координата X из места клика относительно окна пользователя

      // ВЫЧИСЛЯЕМ КУДА КЛИКНУЛ
      var sliderX = windowX - windowXSliderStart // координата X из места клика относительно длины слайдера
      var procent = sliderX / sliderWidth // sliderX переводится в проценты для transform: scale

      // ВЫЧИСЛЯЕМ currentValue относительно position
      // var currentValue = step * Math.round((procent * (maxValue - minValue)) / step) + minValue
      var currentValue = step * Math.round((procent * (maxValue - minValue)) / step) + minValue

      console.log(
        'Длина слайдера:',
        sliderWidth,
        '\nКоордината X начала слайдера относительно окна пользователя:',
        windowXSliderStart,
        '\nкоордината X из места клика относительно длины слайдера:',
        windowX,
        '\nКоордината X из места клика относительно окна пользователя:',
        sliderX,
        '\nsliderX переводится в проценты для transform: scale:',
        procent,
        '\nВычесляем currentValue относительно position:',
        currentValue
      )

      if (procent >= 0 && procent <= 1) {
        // УСТАНАВЛИВАЕМ ДЛИНУ для scale
        scale.setAttribute('style', `transform: scale(${procent}, 1);`)

        // Переносим toggle в место клика
        toggle.setAttribute('style', `transform: translateX(${sliderX}px);`)

        // Передаем currentValue в thumb
        thumb.innerHTML = `${currentValue}`
      }
    }

    function setRulerValues() {
      const values = getRulerValues()

      values.map(function (item) {
        const posX = getRulerItemPosition(item)
        ruler.innerHTML += `<li class="ruler__item" style="transform: translateX(${posX}%);">${item}</li>`
      })
    }

    function getRulerValues(): any[] {
      const midQuantity = Math.ceil((maxValue - minValue) / step)
      const viewStep = Math.ceil(midQuantity / 5) * step
      const midArr = []
      let value = minValue

      for (let i = 0; value < maxValue; i += 1) {
        value += viewStep
        if (value < maxValue) {
          midArr.push(value)
        }
      }

      return [minValue, ...midArr, maxValue]
    }

    setRulerValues()

    thumb.innerHTML = `${minValue}`

    slider.addEventListener('click', updateDisplay)

    bar.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', updateDisplay)
    })

    toggle.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', updateDisplay)
    })

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateDisplay)
    })
  }
}

export default View
