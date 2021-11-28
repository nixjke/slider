import Presenter from './Presenter/Presenter'

let anchor = document.querySelector('#anchor') as HTMLElement


let presenterSettings = {
  min: 0,
  max: 100,
  step: 2,
  values: [20],
  direction: 'horizontal',
  type: 'single',
  bar: true,
  tip: true,
  scale: true,
}

let presenter = new Presenter()

console.log(presenter)
