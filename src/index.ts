import './plugin/View/scss/index.scss'
import { Controller } from './plugin/Controller/Controller'
const slider = document.getElementById("slider") as HTMLElement;

const controller = new Controller(slider);

console.log(controller)