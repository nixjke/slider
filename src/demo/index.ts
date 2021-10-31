import Presenter from '../Presenter/Presenter';

let a = new Presenter({
  start: 1,
  currentValue: 20,
  range: {
    min: 1,
    max: 100,
  }
})

console.log(a)