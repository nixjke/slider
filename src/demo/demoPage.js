$(document).ready(function () {
  const defaultSlider = $('.js-range-slider').rangeSlider({
    values: { start: 15 },
    step: 1,
    range: { min: 0, max: 100 },
    ruler: true,
    thumb: true,
  })
})
