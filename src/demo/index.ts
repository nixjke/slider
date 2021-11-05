import '../../node_modules/normalize.css/normalize.css'
import '../style/index.scss'
import Presenter from '../Presenter/Presenter'

let div = document.getElementById('slider') as HTMLElement

let slider = new Presenter(div, {
  max: 100,
  min: 0,
  step: 1,
  value: [20],
})

console.log(slider)