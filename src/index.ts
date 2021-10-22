import './scss/index.scss'
import { Model } from './Model/Model'

let f = new Model({
  min: 0,
  max: 100,
  step: 1,
  values: [30]
})

console.log(f)