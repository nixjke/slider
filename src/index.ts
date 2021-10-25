import './View/scss/index.scss'
import { Controller } from './Controller/Controller'
const slider = document.getElementById("slider") as HTMLElement;

const controller = new Controller(slider);

console.log(controller)
