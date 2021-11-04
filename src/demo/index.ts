import '../../node_modules/normalize.css/normalize.css'
import '../style/index.scss'
import Presenter from '../Presenter/Presenter'

let div = document.getElementById('slider') as HTMLElement

let slider = new Presenter(div, {
  min: 1,
  max: 100,
  value: 20,
  step: 1,
})

console.log(slider)
