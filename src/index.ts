import Slider from './slider'
import defaultState from './utils/defaultState'
import ISliderOptions from './utils/ISliderOprions'
import ModelState from './utils/IModel'
import './scss/index.scss'

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): Slider
  }
}
;(function (jquery) {
  const $ = jquery

  $.fn.rangeSlider = function (options: ModelState) {
    let sliderOptions = options
    sliderOptions = $.extend(
      {
        domParent: this[0],
        ...defaultState,
      },
      sliderOptions
    )

    const slider = new Slider(sliderOptions as ISliderOptions)
    slider.init()

    return slider
  }
})(jQuery)
