$(document).ready(function () {
  const defaultSlider = $('.js-range-slider').rangeSlider({
    values: { start: 15 },
    step: 1,
    range: { min: 1, max: 100 },
    ruler: true,
    thumb: true,
    orientation: 'horizontal',
  })
})
