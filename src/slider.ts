import Presenter from './Presenter/Presenter'

let anchor = document.querySelector('#anchor') as HTMLElement

let input = document.querySelector('#input') as HTMLInputElement


let presenterSettings = {
  min: 0,
  max: 100,
  step: 2,
  values: [20],
  direction: 'vertical',
  type: 'single',
  bar: true,
  tip: true,
  scale: true,
}

let presenter = new Presenter(anchor, presenterSettings)

console.log(presenter)
