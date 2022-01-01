import Presenter from './Presenter/Presenter'

let anchor = document.getElementById('anchor') as HTMLElement

let a = new Presenter(anchor, {
  values: { start: 20 },
  range: { min: 1, max: 100 },
  ruler: true,
  thumb: true,
  step: 1,
  orientation: 'vertical',
})

console.log(a)