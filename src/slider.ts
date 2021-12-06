import Model from './Model/Model'

let a = new Model({
  values: { start: 20 },
  range: { min: 1, max: 100 },
  scale: true,
  tip: true,
  step: 1,
  orientation: 'vertical',
})


console.log(a)