import './plugin/View/scss/index.scss'
import { Controller } from './plugin/Controller/Controller'
import { ApplicationConfigurator } from './plugin/View/AbstractFactory/Application'

const slider = document.getElementById('slider') as HTMLElement
const controller = new Controller(slider)

console.log(slider)
console.log(controller)
