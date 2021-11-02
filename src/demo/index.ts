import '../../node_modules/normalize.css/normalize.css'
import '../style/index.scss'
import Presenter from '../Presenter/Presenter'

let slider = document.getElementById('slider')
let a = new Presenter(slider, {
  start: 1,
  currentValue: 20,
  range: {
    min: 1,
    max: 1000,
  },
})

console.log(a)
