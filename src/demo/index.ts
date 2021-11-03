import '../../node_modules/normalize.css/normalize.css'
import '../style/index.scss'
import Presenter from '../Presenter/Presenter'

let div = document.getElementById('slider') as HTMLElement

let slider = new Presenter(div, {
  start: 1,
  currentValue: 20,
  range: {
    min: 1,
    max: 1000,
  },
})

console.log(slider)
